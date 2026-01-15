// npm 배포용
import "./secure-keypad.css";
import cssText from "./secure-keypad.css?raw";

const STYLE_ID = "secure-keypad-styles";

if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = cssText;
  document.head.appendChild(style);
}

export { default } from "./components/Keypad.jsx";
export { default as Keypad } from "./components/Keypad";
