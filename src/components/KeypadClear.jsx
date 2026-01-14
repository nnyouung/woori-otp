import React from "react";

const KeypadClear = ({ onClear, disabled }) => {
  return (
    <button
      className="keypad-button keypad-clear"
      type="button"
      onClick={onClear}
      disabled={disabled}
    >
      초기화
    </button>
  );
};

export default KeypadClear;
