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

const Keypad = () => {
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
