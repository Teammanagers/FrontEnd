## 1. Setting
### 1. git clone (폴더 이동)
### 2. npm install

## 2. Branch Convention
### 1. main에서 git pull
### 2. git checkout -b '브랜치 이름'
### 3. '브랜치 이름'에서 pull request 생성
### 4. 코드 리뷰 진행 후 main에 merge

## 3. 폴더구조

```
src/
├── assets // 컴포넌트 안에 들어가는 이미지 파일
├── apis // api 호출하는 함수 관리
├── components // 컴포넌트 관리
│   ├── common // 기본 컴포넌트
│   └── login... /* 
│                    common 컴포넌트가 모인 복합 컴포넌트
│                    (관심사로 분리)
│                */ 
├── constant // api를 호출하는 url과 같이 상수 관리
├── hooks // custom hook 관리
├── store // 전역 상태 관리
├── utils // 각종 함수 관리 (validator 등)
├── pages
│   └── calendar.tsx
│       ├── calendar.tsx // /calendar에 해당하는 파일
│       ├── extra.tsx // dynamic routing 용도
│       └── index.ts // import helper 파일
│       ...
├── App.tsx // routing 처리
├── index.css // 전역 css 관리
└── index.tsx 
```

## 4. Commit Convention
- feat: 새로운 기능 추가
- fix: 버그 수정
- style: css 파일 위주의 ui 작업
- docs: 문서 수정
- refactor: 코드 리팩토링
- chore: 빌드 업무 수정, 패키지 매니저 수정

## 5. URL Convention
### url을 명명할 때는 하이픈(-)을 사용해 주세요.
- pathname/test-name (O)
- pathname/testName (X)

## 6. Folder Convention
### 폴더 이름은 소문자로, 이름이 길어진다면 하이픈(-)을 사용해 주세요.
#### validator, share-memo...

## 7. File Convention
### 1) 컴포넌트는 대문자로 시작하게 명명해 주세요.
#### Button.tsx / SideBar.tsx ...
### 2) 함수는 소문자로 시작하게 명명해 주세요.
#### checkAvailableDate.ts ...
### 3) custom hook은 use로 시작하게 명명해 주세요.
#### useShareWork.ts...
### * 단, page의 경우 소문자로 명명합니다.