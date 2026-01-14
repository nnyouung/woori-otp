import React from "react";

const KeypadBackspace = ({ onBackspace, disabled }) => {
  return (
    <button
      className="keypad-button keypad-backspace"
      type="button"
      onClick={onBackspace}
      disabled={disabled}
    >
      ⌫
    </button>
  );
};

export default KeypadBackspace;
