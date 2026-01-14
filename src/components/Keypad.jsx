import { useCallback, useEffect, useRef, useState } from "react";
import createMixedKey from "@/utils/createMixedKey";
import useShuffleKeys from "@/utils/useShuffleKeys";
import KeypadBackspace from "./KeypadBackspace";
import KeypadClear from "./KeyPadClear";
import KeypadOk from "./KeyPadOk";

const keypadItems = [
  { type: "num", value: 1 },
  { type: "num", value: 2 },
  { type: "num", value: 3 },
  { type: "num", value: 4 },
  { type: "del" },
  { type: "num", value: 5 },
  { type: "num", value: 6 },
  { type: "num", value: 7 },
  { type: "num", value: 8 },
  { type: "clear" },
  { type: "num", value: 9 },
  { type: "num", value: 0 },
  { type: "dummy" },
  { type: "dummy" },
  { type: "ok" },
];

const Keypad = ({
  mixedKey = false,
  shuffleKey = false,
  pressCooldown = 500,
  onPress,
}) => {
  const [pressedKey, setPressedKey] = useState(null);
  const [mixedKeys, setMixedKeys] = useState([]);
  const [cooling, setCooling] = useState(false);

  const cooldownUntilRef = useRef(0);
  const timerRef = useRef(null);

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

  const handleBackspace = () => {
    console.log("백스페이스 눌림");
  };

  const handleClear = () => {
    console.log("초기화 눌림");
  };

  const handleOk = () => {
    console.log("확인 눌림");
  };

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
              <KeypadBackspace onBackspace={handleBackspace} disabled={false} />
            );
          }

          if (item.type === "clear") {
            return <KeypadClear onClear={handleClear} disabled={false} />;
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
            return <KeypadOk onOk={handleOk} disabled={false} />;
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Keypad;
