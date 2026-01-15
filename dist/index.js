import { jsx as b, jsxs as I } from "react/jsx-runtime";
import { useRef as g, useState as m, useMemo as U, useEffect as K, useCallback as $ } from "react";
const j = `html,
body,
#root {
  @apply w-full h-full;
}

body {
  margin: 0;
  background: #ffffff;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR",
    "Apple SD Gothic Neo", "Malgun Gothic", Arial, sans-serif;
  font-weight: 500;
  font-size: 20px;
}

/* 키패드가 있는 화면(페이지/섹션)에서만 가운데 정렬 */
.keypad-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 22px;
}

/* =========================
   Keypad styles (2번 완성본 스타일)
   ========================= */

:root {
  --blue: #3182f6;
  --blue-weak: #eaf3ff;

  /* ✅ 2번처럼 연한 보더 */
  --stroke: #e9ecef;
  --stroke-2: #e9ecef;

  --num-bg: #ffffff;
  --num-tx: #0b1220;

  --fn-bg: #ffffff;
  /* ✅ function도 흰 배경 */
  --fn-tx: #0b1220;

  /* ✅ 2번처럼 거의 각진 박스 */
  --radius: 14px;
  --cell-radius: 0px;
  /* ✅ 버튼 둥글기 제거 */

  --cell-h: 56px;
  --num-col: minmax(58px, 1fr);
  --fn-col: 110px;

  --gap: 0px;
  /* ✅ 셀을 붙여서 표처럼 */

  --focus: 0 0 0 3px rgba(49, 130, 246, 0.22);
}

* {
  box-sizing: border-box;
}

.kp {
  width: min(420px, 96vw);
  background: transparent;
  border: 2px solid var(--stroke);
  padding: 0;
  /* ✅ 바깥 패딩 제거(표 느낌) */
  overflow: hidden;
  /* ✅ 모서리 깔끔하게 */
}

.kp__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: var(--cell-h);
  gap: var(--gap);
  /* ✅ 0 */
}

/* 버튼을 '셀'처럼 보이게: 연한 border + radius 제거 */
button.kp__btn {
  appearance: none;
  border: 1px solid var(--stroke-2);
  /* 두꺼운 라인 → 얇은 라인 */
  border-radius: var(--cell-radius);
  /* ✅ 0 */
  background: var(--num-bg);
  padding: 0;
  cursor: pointer;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: background 0.12s ease, border-color 0.12s ease;
  color: #0b1220;
}

button.kp__btn:focus-visible {
  outline: none;
  box-shadow: var(--focus);
  border-color: rgba(49, 130, 246, 0.7);
}

/* number keys */
.kp__btn--num {
  /* 2번처럼 더 크게 */
  font-weight: 900;
  letter-spacing: 0.2px;
  -webkit-tap-highlight-color: transparent;
}

/* 눌림 효과 */
button.kp__btn.kp__btn--num:active {
  background: #f3f4f6;
  border-color: #4f8a4b;
}

.kp__btn--num.mixed {
  background: #f3f4f6;
  border-color: #4f8a4b;
}

/* DEL (아이콘/텍스트) - 2번처럼 '작은 아이콘만'이면 텍스트 숨겨도 됨 */
.kp__btn--del {
  display: flex;
  gap: 8px;
  justify-content: center;
  background: #ffffff;
  /* ✅ 흰 배경 */
  border-color: var(--stroke-2);
}

.kp__btn--del .kp__icon {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  color: #4f8a4b;
}

.kp__btn--del .kp__deltext {
  display: none;
  /* ✅ 2번은 텍스트 거의 없음(필요하면 주석 해제) */
}

/* 완료(OK) 버튼 */
.kp__btn--ok {
  background: #508c4e !important;
  color: #ffffff !important;
  border-color: var(--stroke-2) !important;
  letter-spacing: 0.2px;

  width: auto;
  /* ✅ 고정값 제거 */
  height: auto;
  /* ✅ 고정값 제거 */

  position: relative;
  z-index: 2;
}

.kp__btn--ok:active {
  background: #457c44 !important;
  border-color: #4f8a4b;
}

/* dummy도 '빈 셀'로: 보더는 유지 */
.kp__btn--dummy {
  pointer-events: none;
  cursor: default;
  background: #ffffff;
  border: 1px solid var(--stroke-2);
}

/* layout: DEL row1 col5, OK spans row2~row3 col5 */
.kp__btn--del {
  grid-column: 5;
  grid-row: 1;
  color: #457c44 !important;
}

.kp__btn--del:active {
  background: #f3f4f6 !important;
  border-color: #4f8a4b;
}

.kp__btn--clear {
  grid-column: 5;
  grid-row: 2;
  color: #457c44 !important;
}

.kp__btn--clear:active {
  background: #f3f4f6 !important;
  border-color: #4f8a4b;
}

.kp__btn--ok {
  grid-column: 5;
  grid-row: 3;
}

@media (max-width: 380px) {
  :root {
    --cell-h: 52px;
    --fn-col: 96px;
  }

  .kp__btn--num {
    font-size: 26px;
  }
}`, L = ({ currentKey: o }) => {
  let e;
  do
    e = Math.floor(Math.random() * 10);
  while (e === o);
  return { randomKey: e };
};
function z(o) {
  const e = [...o];
  for (let t = e.length - 1; t > 0; t--) {
    const l = Math.floor(Math.random() * (t + 1));
    [e[t], e[l]] = [e[l], e[t]];
  }
  return e;
}
const P = 4, G = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function F({
  numbers: o = G,
  shuffleKey: e = !1
} = {}) {
  const t = g(0), [l, u] = m(0);
  return { keys: U(() => {
    const s = o.map((c) => ({
      type: "num",
      value: c
    })), k = Array.from({ length: 2 }, () => ({ type: "dummy" })), y = [...s, ...k];
    return e ? z(y) : y;
  }, [o, e, l]), onDigitPress: () => {
    e && (t.current += 1, t.current >= P && (t.current = 0, u((s) => s + 1)));
  } };
}
function H({
  type: o,
  onOkClick: e,
  onBackspaceClick: t,
  onClearClick: l
}) {
  switch (o) {
    case "del":
      return () => {
        console.log("del 눌림"), t?.();
      };
    case "clear":
      return () => {
        console.log("clear 눌림"), l?.();
      };
    case "ok":
      return () => {
        console.log("ok 눌림"), e?.();
      };
    default:
      return () => {
      };
  }
}
const O = [
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
  { type: "ok" }
], q = ({
  mixedKey: o = !1,
  // 동시 키 눌림 효과
  shuffleKey: e = !1,
  // 숫자키 섞기
  pressCooldown: t = 500,
  // 버튼 누른 후 쿨다운 시간 (ms)
  onPress: l,
  onOkClick: u,
  onBackspaceClick: i,
  onClearClick: f
}) => {
  const [s, k] = m(null), [y, c] = m([]), [_, h] = m(!1), x = g(0), d = g(null), T = (n) => {
    const r = n.target.closest("button");
    if (!r || r.classList.contains("kp__btn--dummy")) return;
    const a = r.dataset.key;
    console.log("버튼 눌림: ", a), a != null && (S(), k(Number(a)));
  };
  K(() => () => d.current && clearTimeout(d.current), []);
  const E = (n) => {
    h(!0), d.current && clearTimeout(d.current);
    const r = Math.max(0, n - Date.now());
    d.current = setTimeout(() => {
      h(!1);
    }, r);
  }, D = $(
    (n) => {
      const r = Date.now();
      if (t > 0 && r < x.current) return;
      const a = r + Math.max(0, t);
      x.current = a, t > 0 && E(a);
      const { action: p, key: w } = n.currentTarget.dataset, A = p ? { type: p } : { type: "num", value: w != null ? Number(w) : void 0 };
      l?.(A), p === "del" && i?.(), p === "clear" && f?.(), p === "ok" && u?.();
    },
    [l, u, i, f, t]
  ), { keys: N, onDigitPress: S } = F({
    shuffleKey: e
  });
  let v = 0;
  const R = O.map((n) => {
    if (n.type === "num" || n.type === "dummy") {
      const r = N[v];
      return v += 1, r ?? { type: "dummy" };
    }
    return n;
  });
  return K(() => {
    if (!o || s === null) {
      c([]);
      return;
    }
    const { randomKey: n } = L({});
    console.log("버튼 같이 눌림: ", s, n), c([s, n]), setTimeout(() => {
      c([]);
    }, 400);
  }, [o, s]), /* @__PURE__ */ b("div", { className: "kp", children: /* @__PURE__ */ b("div", { className: "kp__grid", onClick: T, children: R.map((n, r) => {
    if (n.type === "num") {
      const a = y.includes(n.value);
      return /* @__PURE__ */ b(
        "button",
        {
          className: `kp__btn kp__btn--num ${a ? "mixed" : ""}`,
          type: "button",
          "data-key": n.value,
          onClick: D,
          disabled: _,
          children: n.value
        },
        `num-${n.value}`
      );
    }
    if (n.type === "del" || n.type === "clear" || n.type === "ok") {
      const a = H({
        type: n.type,
        onOkClick: u,
        onBackspaceClick: i,
        onClearClick: f
      });
      return /* @__PURE__ */ I(
        "button",
        {
          className: `kp__btn kp__btn--${n.type}`,
          type: "button",
          onClick: a,
          "data-action": n.type,
          disabled: _,
          children: [
            n.type === "del" && "⌫",
            n.type === "clear" && "초기화",
            n.type === "ok" && "OK"
          ]
        },
        `${n.type}-${r}`
      );
    }
    return n.type === "dummy" ? /* @__PURE__ */ b(
      "button",
      {
        className: "kp__btn kp__btn--dummy",
        type: "button",
        tabIndex: -1,
        "aria-hidden": "true"
      },
      `dummy-${r}`
    ) : null;
  }) }) });
}, M = "secure-keypad-styles";
if (typeof document < "u" && !document.getElementById(M)) {
  const o = document.createElement("style");
  o.id = M, o.textContent = j, document.head.appendChild(o);
}
export {
  q as Keypad,
  q as default
};
