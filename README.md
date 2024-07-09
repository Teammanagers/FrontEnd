## 1. Setting
### 1. git clone (폴더 이동)
### 2. npm install

## 2. Branch Convention
### 1. main에서 git pull
### 2. git checkout -b '브랜치 이름'
### 3. '브랜치 이름'에서 pull request 생성
### 4. 코드 리뷰 진행 후 main에 merge

## 3. Commit Convention
- feat: 새로운 기능 추가
- fix: 버그 수정
- style: css 파일 위주의 ui 작업
- docs: 문서 수정
- refactor: 코드 리팩토링
- chore: 빌드 업무 수정, 패키지 매니저 수정

## 4. URL Convention
### url을 명명할 때는 하이픈(-)을 사용해 주세요.
- [O] pathname/test-name
- [X] pathname/testName

## 5. Folder Convention
### 폴더 이름은 소문자로, 이름이 길어진다면 하이픈(-)을 사용해 주세요.
#### validator, share-memo...

## 6. File Convention
### 1) 컴포넌트는 대문자로 시작하게 명명해 주세요.
#### Button.tsx / SideBar.tsx ...
### 2) 함수는 소문자로 시작하게 명명해 주세요.
#### checkAvailableDate.ts ...
### 3) custom hook은 use로 시작하게 명명해 주세요.
#### useShareWork.ts...