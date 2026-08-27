# skala-vue

This template should help get you started developing with Vue 3 in Vite.

## 프로젝트 구조

아래 파일은 현재 `main.js`의 실행 경로와 라우터가 직접 또는 간접으로 사용하는 파일이므로 삭제하면 안 됩니다.

### 실행 및 설정

- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `.env.example`
- `src/main.js`
- `src/App.vue`
- `src/router/index.js`

### 전역 스타일

- `src/assets/base.css`
- `src/assets/main.css`
- `src/assets/exercise.css`

### 화면 및 컴포넌트

- `src/views/WeatherHomeView.vue`
- `src/views/WeatherAboutView.vue`
- `src/views/WeatherDetailView.vue`
- `src/views/GameScheduleList.vue`
- `src/views/NotFoundView.vue`
- `src/components/exercise/BaseDashboardCard.vue`
- `src/components/exercise/SearchBar.vue`
- `src/components/exercise/UnitToggler.vue`
- `src/components/exercise/WeatherCard.vue`

### 상태, API 및 데이터

- `src/stores/configStore.js`
- `src/stores/themeStore.js`
- `src/stores/weatherStore.js`
- `src/api/weatherApi.js`
- `src/api/airKoreaApi.js`
- `src/data/baseballData.js`
- `src/data/stadiumData.js`
- `src/data/weatherFallbackData.js`

### 경기 팀 이미지

- `public/emblem_HH.png`
- `public/emblem_HT.png`
- `public/emblem_KT.png`
- `public/emblem_LG.png`
- `public/emblem_LT.png`
- `public/emblem_NC.png`
- `public/emblem_OB.png`
- `public/emblem_SK.png`
- `public/emblem_SS.png`
- `public/emblem_WO.png`

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
