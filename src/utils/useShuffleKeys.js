import { useMemo, useRef, useState } from "react";

// Fisher-Yates shuffle 알고리즘
function shuffle(arr){
 const a = [...arr]; // 복사본 배열 생성
 for (let i = a.length-1; i>0; i--){
  const j = Math.floor(Math.random() * (i+1));
  [a[i],a[j]] = [a[j],a[i]];
 }
 return a;
}

// 숫자 4번 입력시 재셔플
const RESET_AFTER = 4;

// 1. 숫자 키 목록 생성
// 2. 더미키 2개 생성
// 3. shuffleKey=true면 숫자랑 더미 같이 섞기
// 4. 숫자 입력 4회 넘으면 재셔플

const DEFAULT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function useShuffleKeys({
 numbers = DEFAULT_NUMBERS,
 shuffleKey = false,
} = {}) {
 const pressCountRef = useRef(0); // 숫자 몇 번 눌렀는지 저장하는 변수
 const [shuffleTick, setShuffleTick] = useState(0); // 재셔플하기위한 useState

 // 1. keys:숫자+더미 목록
 const keys = useMemo(() => {
  const digitKeys = numbers.map((n) => ({
   type: "num",
   value: n,
  }))

  // 2. 더미 2개 생성
  const dummyKeys = Array.from({ length: 2 }, () => ({ type: "dummy" }));
  
   // 숫자+더미 한 배열로 합치기
   const base = [...digitKeys, ...dummyKeys];
   
   if(!shuffleKey) return base;

   // 3. 랜덤 키패드
   return shuffle(base);
 }, [numbers, shuffleKey, shuffleTick]);

 const onDigitPress = () => {
  if (!shuffleKey) return;

  pressCountRef.current += 1;

  // 4. 재셔플
  if (pressCountRef.current >= RESET_AFTER){
   pressCountRef.current = 0;
   setShuffleTick((t) => t+1);
  }
 };

 return { keys,onDigitPress };
}