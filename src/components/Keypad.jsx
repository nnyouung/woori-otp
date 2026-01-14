import { useCallback, useEffect, useRef, useState } from "react";

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

  return (
    <div className="kp">
      <div className="kp__grid">
        {keypadItems.map((item, index) => {
          if (item.type === "num") {
            return (
              <button
                key={`num-${item.value}`}
                className="kp__btn kp__btn--num"
                type="button"
                data-key={item.value}
                onClick={handlePress}
                disabled={cooling}
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
