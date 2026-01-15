# Secure Keypad Component

React 기반의 커스텀 보안 키패드 컴포넌트입니다.  
**랜덤 키 배치(shuffle)** 와 **키 동시 눌림 효과(mixed key)**, **연타방지(cooldown)** 기능을 지원합니다.

## 주요 기능

- 숫자 키 및 액션 버튼(`del`, `clear`, `ok`) 지원  
- 랜덤 키 배치(`shuffleKey`) 기능  
- 키 동시 눌림 효과(`mixedKey`): 한 번에 두 버튼을 눌린 것처럼 표시  
- 버튼 연타방지(`pressCooldown`) 지원: 쿨다운 동안 버튼 비활성화

## 설치

```bash
npm i secure-keypad
```

## 기본 키패드 props
| 속성 | 기본값 | 타입 |
| --- | --- | --- |
| shuffleKey | false | true / false |
| mixedKey | false | true / false |
| pressCooldown | 500 | number |
| onOk | - | () => void |
| onBackspaceClick | - | () => void |
| onClear | - | () => void |

