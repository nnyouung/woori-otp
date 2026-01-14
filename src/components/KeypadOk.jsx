// 키패드 확인 버튼

import React from "react";

const KeypadOk = ({ onOk, disabled }) => {
  return (
    <button
      className="keypad-button keypad-ok"
      type="button"
      onClick={onOk}
      disabled={disabled}
    >
      확인
    </button>
  );
};

export default KeypadOk;
