// 키패드 처리
// props로 mixedKey boolean
// true면 키패드에서 눌린 키를(pressedKey) 컴포넌트 MixedKey의 props로 전달
// 응답값을 가져와 키패드에서 두 개를 시각처리

import createMixedKey from "@/utils/createMixedKey";
import { useState, useEffect } from "react";

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

const Keypad = ({ mixedKey = false }) => {
  const [pressedKey, setPressedKey] = useState(null);
  const [mixedKeys, setMixedKeys] = useState([]);

  const handleGridClick = (event) => {
    const button = event.target.closest("button");
    if (!button || button.classList.contains("kp__btn--dummy")) return;

    const key = button.dataset.key;
    console.log("버튼 눌림: ", key);
    if (key != null) {
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
        {keypadItems.map((item, index) => {
          if (item.type === "num") {
            const isMixedKey = mixedKeys.includes(item.value);
            return (
              <button
                key={`num-${item.value}`}
                className="kp__btn kp__btn--num"
                type="button"
                data-key={item.value}
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
