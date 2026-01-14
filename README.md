# Secure Keypad Component

React 기반의 커스텀 키패드 컴포넌트 프로젝트입니다.  
숫자 키, 삭제, 초기화, 확인 버튼을 포함하며, **숫자 섞기(shuffle)**와 **혼합 키(mixed key)** 기능을 지원합니다.

## 주요 기능

- 숫자 키 및 액션 버튼(`del`, `clear`, `ok`) 지원  
- `onPress` 콜백을 통해 모든 버튼 입력 통일 처리  
- 숫자 키 섞기(`shuffleKey`) 기능  
- 혼합 키(`mixedKey`) 기능: 한 번에 두 버튼을 눌린 것처럼 표시  
- 버튼 쿨다운(`pressCooldown`) 지원  
- UI 상태 반영: 눌린 키 표시, 쿨다운 동안 버튼 비활성화  

## 설치

```bash
npm install
# 또는
yarn install


# 기본 키패드 props
| 속성 | 기본값 | 타입 |
| --- | --- | --- |
| shuffleKey | false | true / false |
| mixedKey | false | true / false |
| onOk | - | () => void |
| onBackspaceClick | - | () => void |
| onClear | - | () => void |

