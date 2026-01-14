import React from "react";

const KeypadClear = ({ onClear, disabled }) => {
  return (
    <button
      key="clear"
      className="kp__btn kp__btn--clear"
      type="button"
      onClick={onClear}
      disabled={disabled}
    >
      초기화
    </button>
  );
};

export default KeypadClear;
