// 키패드 확인 버튼

import React from "react";

const KeypadOk = ({ onOk, disabled }) => {
  return (
    <button
      key="ok"
      className="kp__btn kp__btn--ok"
      type="button"
      onClick={onOk}
      disabled={disabled}
    >
      확인
    </button>
  );
};

export default KeypadOk;
