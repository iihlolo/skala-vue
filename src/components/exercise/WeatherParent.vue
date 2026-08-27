<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
// 1. 컴포넌트 파일명 국룰 표기법(PascalCase) 매칭 수입
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import GameScheduleList from './GameScheduleList.vue'

// 모든 반응형 데이터는 WeatherParent가 유지 (자식은 props/emits로만 소통)
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', fineDust: '나쁨', humidity: 60, wind: 2.4 },
  { id: 'city_02', name: '인천', temp: 24, status: '비', fineDust: '좋음', humidity: 70, wind: 1.8 },
  { id: 'city_03', name: '대전', temp: 26, status: '구름', fineDust: '보통', humidity: 65, wind: 3.1 },
  { id: 'city_04', name: '수원', temp: 22, status: '바람', fineDust: '좋음', humidity: 55, wind: 5.6 },
  { id: 'city_05', name: '광주', temp: 22, status: '비', fineDust: '좋음', humidity: 75, wind: 4.2 },
  { id: 'city_06', name: '대구', temp: 22, status: '바람', fineDust: '나쁨', humidity: 55, wind: 2.2 },
  { id: 'city_07', name: '부산', temp: 22, status: '맑음', fineDust: '보통', humidity: 55, wind: 4.5 },
  { id: 'city_08', name: '창원', temp: 22, status: '바람', fineDust: '보통', humidity: 60, wind: 5.6 },
])

const baseballGames = [
  { city: '서울', awayTeam: 'NC', homeTeam: '두산' },
  { city: '인천', awayTeam: 'KT', homeTeam: 'SSG' },
  { city: '대전', awayTeam: '삼성', homeTeam: '한화' },
  { city: '광주', awayTeam: '키움', homeTeam: '기아' },
  { city: '부산', awayTeam: 'LG', homeTeam: '롯데' },
]

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 검색어에 맞는 도시만 필터링하는 연산기
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

const todayBaseballGames = computed(() =>
  baseballGames.map((game) => {
    const weather = weatherList.value.find((item) => item.name === game.city)

    return {
      ...game,
      weather,
      gameStatus: weather?.status === '비' ? '우취' : '경기',
    }
  }),
)

// 도시명으로 야구 경기를 빠르게 찾기 위한 맵
const gameByCity = computed(() => Object.fromEntries(todayBaseballGames.value.map((game) => [game.city, game])))

// 전체 도시의 평균 기온을 계산하는 연산기
const averageTemp = computed(() => {
  if (weatherList.value.length === 0) return 0
  const total = weatherList.value.reduce((sum, item) => sum + item.temp, 0)
  return Math.round((total / weatherList.value.length) * 10) / 10
})

// 현재 선택된 도시의 미세먼지 상태를 찾는 연산기
const selectedCityDust = computed(() => {
  const city = weatherList.value.find((item) => selectedCityInfo.value === `${item.name}이 선택되었습니다.`)
  return city?.fineDust ?? null
})

watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

watch(selectedCityDust, (newDust) => {
  if (!newDust) return
  console.log(`🌫️ [watch 감지] 선택된 도시의 미세먼지 상태 -> "${newDust}"`)
})

watchEffect(() => {
  console.log(`🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`)
})

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>
      <p>평균 기온: {{ averageTemp }}°C</p>

      <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" :game="gameByCity[item.name]" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="showDetail" />

      <p v-if="filteredWeatherList.length === 0" class="empty-msg">😭 검색 결과와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <GameScheduleList :games="todayBaseballGames" />

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}
.empty-msg {
  text-align: center;
  color: #e74c3c;
  padding: 10px 0;
}
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
</style>
