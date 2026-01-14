// 키패드 처리
// props로 mixedKey boolean
// true면 키패드에서 눌린 키를(pressedKey) 컴포넌트 MixedKey의 props로 전달
// 응답값을 가져와 키패드에서 두 개를 시각처리

import createMixedKey from "@/utils/createMixedKey";
import { useState, useEffect } from "react";
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
