// 테스트용 (npm 배포 X)
import Keypad from "@/components/Keypad";

function App() {
  const handlePress = (payload) => {
    // 키패드에서 눌린 값 처리 (확인용)
    console.log("Keypad press:", payload);
  };

  return (
    <div>
      <Keypad shuffleKey={true} mixedKey={true} onPress={handlePress} />
    </div>
  );
}

export default App;
