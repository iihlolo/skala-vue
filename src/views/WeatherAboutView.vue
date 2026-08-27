<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <section class="about-container">
    <h3>ℹ️ 서비스 소개</h3>
    <hr />

    <div class="description-box">
      <p>본 앱은 <strong>Vue 3</strong>와 <strong>Vue Router</strong>로 만든 실습용 야구장 기상 관측 대시보드입니다.</p>
      <ul>
        <li>지역, 주소, 야구장 이름으로 관측 지역을 검색</li>
        <li>도시별 상세 페이지에서 기온, 날씨, 습도, 풍속, 미세먼지 확인</li>
        <li>당일 야구 경기 일정과 날씨에 따른 경기 상태 확인</li>
      </ul>
    </div>

    <button @click="handleGoHome" class="home-btn">대시보드 홈으로 이동</button>
  </section>
</template>

<style scoped>
.about-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.description-box {
  width: 100%;
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  line-height: 1.5;
  font-size: 14px;
  box-sizing: border-box;
}

ul {
  padding-left: 20px;
  margin: 8px 0 0 0;
}

li {
  margin-bottom: 6px;
  color: #555;
}

code {
  background-color: #ffeaa7;
  padding: 2px 4px;
  border-radius: 4px;
  color: #d63031;
}

.home-btn {
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>
