import React from "react";

const KeypadBackspace = ({ onBackspace, disabled }) => {
  return (
    <button
      className="kp__btn kp__btn-del "
      type="button"
      onClick={onBackspace}
      disabled={disabled}
    >
      ⌫
    </button>
  );
};

export default KeypadBackspace;
