// 테스트용 (npm 배포 X)
import Keypad from "@/components/Keypad";

function App() {
  return (
    <div>
      <Keypad shuffleKey={true} mixedKey={true} />
    </div>
  );
}

export default App;
