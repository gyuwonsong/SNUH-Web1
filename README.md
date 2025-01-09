## 1. 프로젝트 설치 및 실행 방법

### 1) 레포지토리 복제

```bash
git clone https://github.com/gyuwonsong/SNUH-Web1.git
```

### 2) npm 설치

```bash
npm install
```

### 3) npm 실행

```bash
npm run dev
```
<br><br/>
## 2. 프로젝트 구조

```
📁 snuh-web1
├── public/                # 정적 자산 (이미지, 아이콘 등)  
├── src/                   # 소스 파일  
│   ├── assets/            # 컴포넌트에서 사용되는 이미지 등의 자원
│   ├── components/        # React 컴포넌트  
│   │   ├── chatting/      # 채팅 관련 컴포넌트  
│   │   │   ├── chatHistoryList.jsx   # 채팅 내역 리스트 컴포넌트  
│   │   │   ├── chatSessionViewer.jsx # 채팅 세션 뷰어 컴포넌트  
│   │   │   ├── chatUI.jsx            # 채팅 UI  
│   │   │   └── userInput.jsx         # 채팅 입력창
│   ├── data/              # 데이터 파일  
│   │   └── dummyChatSessions.js      # 더미 채팅 세션 데이터  
│   ├── services/          # 서비스 파일 (API 호출 등)  
│   │   └── llmService.js  # LLM 서비스 API 함수  
│   ├── App.css            # App 컴포넌트 스타일 시트
│   ├── App.jsx            # 메인 App 컴포넌트  
│   ├── index.css          # 전역 스타일 시트  
│   ├── main.jsx           # 엔트리 포인트  
├── .gitignore             # Git 무시 규칙
├── eslint.config.js       # ESLint 설정 파일
├── index.html             # HTML 템플릿  
├── package.json           # NPM 종속성 및 스크립트
├── package-lock.json      # NPM 종속성 버전 잠금 파일
├── postcss.config.js      # PostCSS 설정 파일  
├── README.md              # 프로젝트 문서
├── tailwind.config.js     # Tailwind CSS 설정 파일
└── vite.config.js         # Vite 설정 파일  
```
<br><br/>
## 3. 주요 기능

- **컴포넌트 기반 구조** : `src/components/` 디렉토리 내에 개별 기능별로 분리된 컴포넌트를 관리,
  예를 들어 `chatting` 폴더에는 채팅 기능을 위한 `chatHistoryList.jsx`, `chatSessionViewer.jsx`, `chatUI.jsx` 등의 컴포넌트가 포함되어 있음.
- **Tailwind CSS 스타일링** : `tailwind.config.js` 및 `postcss.config.js` 파일을 사용해 프로젝트의 스타일링 환경을 구성함.
  글로벌 스타일은 src/index.css에서 관리되며, 각 컴포넌트는 Tailwind CSS 클래스를 활용하여 디자인 됨. 

<br><br/>
## 4. 기술 스택

- **React** - UI 라이브러리
- **Tailwind CSS** - 유틸리티 중심의 CSS 프레임워크
- **PostCSS** - CSS 빌드 도구