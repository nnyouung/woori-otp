// pressedKey 제외 랜덤 숫자(randomKey) 한 개를 생성
// 응답으로 pressedKey와 randomKey를 돌려주기

const createMixedKey = ({ currentKey }) => {
  let randomKey;
  do {
    randomKey = Math.floor(Math.random() * 10);
  } while (randomKey === currentKey);

  return { randomKey };
};

export default createMixedKey;
