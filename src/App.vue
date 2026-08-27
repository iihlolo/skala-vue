<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink class="brand" to="/">BASEBALL WEATHER</RouterLink>
      <nav aria-label="주요 메뉴">
        <RouterLink to="/">날씨</RouterLink>
        <RouterLink to="/games">경기 일정</RouterLink>
        <RouterLink to="/about">서비스 소개</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
  background: #f6f7f9;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 2000px;
  margin: 0 auto;
  padding: 16px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e7e9ee;
}

.brand {
  color: #1c1f26;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;
}

.app-header nav {
  display: flex;
  gap: 8px;
}

.app-header a {
  padding: 7px 10px;
  color: #4b5563;
  font-size: 14px;
  text-decoration: none;
}

.app-header a.router-link-active {
  color: #2454c6;
  font-weight: 700;
}

.app-main {
  max-width: 2000px;
  margin: 0 auto;
}

@media (max-width: 560px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
