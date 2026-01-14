// pressedKey 제외 랜덤 숫자(randomKey) 한 개를 생성
// 응답으로 pressedKey와 randomKey를 돌려주기

const createMixedKey = ({ pressedKey }) => {
  let randomKey;
  do {
    randomKey = Math.random();
  } while (randomKey === pressedKey);

  return { pressedKey, randomKey };
};

export default createMixedKey;

// 키패드 처리
// props로 mixedKey boolean
// true면 키패드에서 눌린 키를(pressedKey) 컴포넌트 MixedKey의 props로 전달
// 응답값을 가져와 키패드에서 두 개를 시각처리

// import MixedKey from "@/utils/MixedKey"
// if (mixedKey === true) {
//    const { pressedKey, randomKey } = createMixedKey(pressedKey);
//    TODO: 위에서 정의한 키들을 키패드에서 시각처리할 것
// }
