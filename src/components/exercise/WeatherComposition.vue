<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import WeatherCard from './WeatherCard.vue'

// 1. [1일차 데이터] 가상의 백엔드 데이터 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', fineDust: '나쁨', humidity: 60, wind: 2.4 },
  { id: 'city_02', name: '인천', temp: 24, status: '비', fineDust: '좋음', humidity: 70, wind: 1.8 },
  { id: 'city_03', name: '대전', temp: 26, status: '구름', fineDust: '보통', humidity: 65, wind: 3.1 },
  { id: 'city_04', name: '수원', temp: 22, status: '바람', fineDust: '좋음', humidity: 55, wind: 5.6 },
  { id: 'city_05', name: '광주', temp: 22, status: '비', fineDust: '좋음', humidity: 75, wind: 4.2 },
  { id: 'city_06', name: '대구', temp: 22, status: '바람', fineDust: '나쁨', humidity: 55, wind: 2.2 },
  { id: 'city_07', name: '부산', temp: 22, status: '맑음', fineDust: '보통', humidity: 55, wind: 4.5 },
  { id: 'city_08', name: '창원', temp: 22, status: '바람', fineDust: '보통', humidity: 60, wind: 5.6 }
])

// 2. [1일차 데이터] 검색어 및 알림창 제어용 데이터
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 3. [2일차 추가] computed를 활용한 실시간 검색 필터링 연산기 (★핵심)
const filteredWeatherList = computed(() => {
  // 사용자가 입력한 검색어의 앞뒤 공백을 제거합니다.
  const query = searchQuery.value.trim()

  // 검색어가 비어있다면 원본 weatherList를 그대로 보여줍니다.
  if (!query) {
    return weatherList.value
  }

  // 검색어가 포함된 도시만 칼같이 필터링하여 실시간으로 뱉어냅니다.
  return weatherList.value.filter((item) => item.name.includes(query))
})

// 6. [본인 추가] 전체 도시의 평균 기온을 계산하는 연산기
const averageTemp = computed(() => {
  if (weatherList.value.length === 0) return 0
  const total = weatherList.value.reduce((sum, item) => sum + item.temp, 0)
  return Math.round((total / weatherList.value.length) * 10) / 10
})

// 7. [본인 추가] 현재 선택된 도시의 미세먼지 상태를 찾는 연산기
const selectedCityDust = computed(() => {
  const city = weatherList.value.find((item) => selectedCityInfo.value === `${item.name}이 선택되었습니다.`)
  return city?.fineDust ?? null
})

// 4. [2일차 추가] watch를 활용한 선택 도시 추적 센서
// selectedCityInfo의 문구 변화를 감시하여 후속 로그를 처리합니다.
watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

// 8. [본인 추가] watch를 활용한 선택 도시 미세먼지 상태 감시 (옵션 A)
watch(selectedCityDust, (newDust) => {
  if (!newDust) return
  console.log(`🌫️ [watch 감지] 선택된 도시의 미세먼지 상태 -> "${newDust}"`)
})

// 5. [2일차 추가] watchEffect를 활용한 자동 의존성 API 로그 시뮬레이션
// 타이핑할 때마다 변하는 searchQuery를 AI CCTV처럼 자동 추적합니다.
watchEffect(() => {
  console.log(`🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`)
})

// 알림 대행 함수
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="검색할 도시 이름 입력" />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>
      <p>평균 기온: {{ averageTemp }}°C</p>

      <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="showDetail" />

      <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">😭 검색 결과와 일치하는 도시가 없습니다.</p>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>
