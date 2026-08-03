# 정우씨앤에어(주) 홈페이지 — jungwooco.com

정적 사이트 (HTML/CSS/JS). 빌드 과정 없이 그대로 호스팅에 올리면 됩니다.

## 구조

```
site/
├── index.html      홈
├── about.html      회사소개
├── services.html   서비스
├── contact.html    문의
├── css/style.css   스타일 (CI 컬러: #19345E / #38C6F4)
├── js/main.js      내비게이션·문의 폼 동작
└── assets/
    ├── symbol.svg        심벌마크 (CI 원본에서 벡터 추출)
    ├── symbol-white.svg  심벌 흰색 버전 (푸터용)
    └── signature.svg     영문 시그니처 (심벌+로고타입)
```

## 배포 전 채워야 할 것 (TODO)

1. **문의 폼 (Formspree)**
   - https://formspree.io 가입 (무료: 월 50건) → New Form → 수신 이메일 seanair@jungwooco.com 지정
   - 발급된 폼 ID(예: `xabcdefg`)를 `contact.html`의 `<form id="contact-form" data-formspree-id="">` 에 입력
   - ID를 넣기 전에는 폼 전송 시 이메일로 안내하는 메시지가 표시됩니다 (사이트가 깨지지는 않음)

완료된 항목: 주소(안양시 동안구 평촌대로 217, 사업자등록증 기준), 대표번호(02-755-7144),
지도(구글맵 임베드 — 카카오맵으로 바꾸려면 contact.html의 `.map-wrap` iframe을
카카오맵 퍼가기 코드로 교체). 영문 표기는 JUNGWOO(붙여쓰기)로 통일.
`assets/signature.svg`(구 로고타입, JUNG WOO 띄어쓰기)는 현재 미사용 — 보관용.

## 배포

### GitHub Pages
1. 새 저장소 생성 → 이 폴더 내용물을 저장소 루트에 push
2. Settings → Pages → Branch: main, 폴더 `/ (root)` 선택
3. 커스텀 도메인: Pages 설정에 `jungwooco.com` 입력 후, 도메인 DNS에서
   - `www` CNAME → `<계정명>.github.io`
   - 루트(A 레코드) → 185.199.108.153 / 109.153 / 110.153 / 111.153
4. "Enforce HTTPS" 체크

### Vercel
1. vercel.com 가입 → Add New Project → 저장소 연결 (Framework: Other, 빌드 설정 없음)
2. Settings → Domains 에 jungwooco.com 추가 → 안내에 따라 DNS 설정

## 영문 버전 추가 (추후)

- `/en/` 폴더를 만들어 4개 페이지를 복사·번역 (assets/css/js는 `../` 경로로 공유)
- 각 페이지 `<head>`에 hreflang 태그 추가:
  ```html
  <link rel="alternate" hreflang="ko" href="https://jungwooco.com/" />
  <link rel="alternate" hreflang="en" href="https://jungwooco.com/en/" />
  ```
- 헤더에 KO/EN 전환 링크 추가

## CI 참고

- 전용색상: Sky Blue `#38C6F4` (PANTONE DS 232-4 U) / Navy `#19345E` (PANTONE DS 202-1 U)
- 로고 SVG는 CI 원본 AI 파일(BS1, BS4)에서 벡터 그대로 추출한 것입니다.
