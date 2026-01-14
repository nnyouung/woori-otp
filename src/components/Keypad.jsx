import { useCallback, useEffect, useRef, useState } from "react";
// 키패드 처리
// props로 mixedKey boolean
// true면 키패드에서 눌린 키를(pressedKey) 컴포넌트 MixedKey의 props로 전달
// 응답값을 가져와 키패드에서 두 개를 시각처리

import createMixedKey from "@/utils/createMixedKey";
import { useState, useEffect } from "react";
import useShuffleKeys from "@/utils/useShuffleKeys";

const keypadItems = [
  { type: "num", value: 1 },
  { type: "num", value: 2 },
  { type: "num", value: 3 },
  { type: "del" },
  { type: "num", value: 4 },
  { type: "num", value: 5 },
  { type: "num", value: 6 },
  { type: "ok" },
  { type: "num", value: 7 },
  { type: "num", value: 8 },
  { type: "num", value: 9 },
  { type: "num", value: 0 },
  { type: "dummy" },
  { type: "dummy" },
];

// 연타 방지 처리
const Keypad = ({ pressCooldown = 500, onPress }) => {
  const [cooling, setCooling] = useState(false);

  const cooldownUntilRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  const setCoolingUntil = (until) => {
    // UI 업데이트용
    setCooling(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = Math.max(0, until - Date.now());

    timerRef.current = setTimeout(() => {
      setCooling(false);
    }, delay);
  };

  const handlePress = useCallback(
    (e) => {
      const now = Date.now();

      // 쿨다운 시간 안이면 무조건 무시
      if (pressCooldown > 0 && now < cooldownUntilRef.current) return;

      const nextUntil = now + Math.max(0, pressCooldown);
      cooldownUntilRef.current = nextUntil;
      if (pressCooldown > 0) setCoolingUntil(nextUntil);

      const { action, key } = e.currentTarget.dataset;
      const payload = action
        ? { type: action }
        : { type: "num", value: key != null ? Number(key) : undefined };

      onPress?.(payload);
    },
    [onPress, pressCooldown]
  );
const Keypad = ({ mixedKey = false, shuffleKey = false }) => {
  const [pressedKey, setPressedKey] = useState(null);
  const [mixedKeys, setMixedKeys] = useState([]);

  const { keys: shuffledKeys, onDigitPress } = useShuffleKeys({
    shuffleKey,
  });

  let cursor = 0;
  const keypadItemsWithShuffle = keypadItems.map((item) => {
    if (item.type === "num" || item.type === "dummy") {
      const next = shuffledKeys[cursor];
      cursor += 1;
      return next ?? { type: "dummy" };
    }
    return item;
  });

  const handleGridClick = (event) => {
    const button = event.target.closest("button");
    if (!button || button.classList.contains("kp__btn--dummy")) return;

    const key = button.dataset.key;
    console.log("버튼 눌림: ", key);
    if (key != null) {
      onDigitPress();
      setPressedKey(Number(key));
    }
  };

  useEffect(() => {
    if (!mixedKey || pressedKey === null) {
      setMixedKeys([]);
      return;
    }

    const { randomKey } = createMixedKey({
      pressedKey,
    });
    console.log("버튼 같이 눌림: ", pressedKey, randomKey);
    setMixedKeys([pressedKey, randomKey]);

    setTimeout(() => {
      setMixedKeys([]);
    }, 400);
  }, [mixedKey, pressedKey]);

  return (
    <div className="kp">
      <div className="kp__grid" onClick={handleGridClick}>
        {keypadItemsWithShuffle.map((item, index) => {
          if (item.type === "num") {
            const isMixedKey = mixedKeys.includes(item.value);
            return (
              <button
                key={`num-${item.value}`}
                className="kp__btn kp__btn--num"
                type="button"
                data-key={item.value}
                onClick={handlePress}
                disabled={cooling}
                style={
                  isMixedKey
                    ? {
                        background: "var(--blue-weak)",
                        borderColor: "rgba(49,130,246,.75)",
                      }
                    : undefined
                }
              >
                {item.value}
              </button>
            );
          }

          if (item.type === "del") {
            return (
              <button
                key="del"
                className="kp__btn kp__btn--fn kp__btn--del"
                type="button"
                data-action="del"
                aria-label="삭제"
                onClick={handlePress}
                disabled={cooling}
              >
                <svg
                  className="kp__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M10 7H20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10L2 12l8-5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 10.2l4.3 4.3M17.8 10.2l-4.3 4.3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="kp__deltext">DEL</span>
              </button>
            );
          }

          if (item.type === "dummy") {
            return (
              <button
                key={`dummy-${index}`}
                className="kp__btn kp__btn--dummy"
                type="button"
                tabIndex={-1}
                aria-hidden="true"
              />
            );
          }

          if (item.type === "ok") {
            return (
              <button
                key="ok"
                className="kp__btn kp__btn--ok"
                type="button"
                data-action="ok"
                onClick={handlePress}
                disabled={cooling}
              >
                확인
              </button>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Keypad;
