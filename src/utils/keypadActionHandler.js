/**
 * keypad action별 실행 로직만 반환하는 유틸
 */
export function getKeypadActionHandler({
  type,
  onOkClick,
  onBackspaceClick,
  onClearClick,
}) {
  switch (type) {
    case "del":
      return () => {
        console.log("del 눌림");
        onBackspaceClick?.();
      };

    case "clear":
      return () => {
        console.log("clear 눌림");
        onClearClick?.();
      };

    case "ok":
      return () => {
        console.log("ok 눌림");
        onOkClick?.();
      };

    default:
      return () => {};
  }
}
