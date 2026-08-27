<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
// 1. 컴포넌트 파일명 국룰 표기법(PascalCase) 매칭 수입
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import GameScheduleList from './GameScheduleList.vue'

// 모든 반응형 데이터는 WeatherParent가 유지 (자식은 props/emits로만 소통)
const weatherList = ref([
  { id: 'city_01', name: '서울', particle: '이', temp: 28, status: '맑음', fineDust: '나쁨', humidity: 60, wind: 2.4 },
  { id: 'city_02', name: '인천', particle: '이', temp: 24, status: '비', fineDust: '좋음', humidity: 70, wind: 1.8 },
  { id: 'city_03', name: '대전', particle: '이', temp: 26, status: '구름', fineDust: '보통', humidity: 65, wind: 3.1 },
  { id: 'city_04', name: '수원', particle: '이', temp: 22, status: '바람', fineDust: '좋음', humidity: 55, wind: 5.6 },
  { id: 'city_05', name: '광주', particle: '가', temp: 22, status: '비', fineDust: '좋음', humidity: 75, wind: 4.2 },
  { id: 'city_06', name: '대구', particle: '가', temp: 22, status: '바람', fineDust: '나쁨', humidity: 55, wind: 2.2 },
  { id: 'city_07', name: '부산', particle: '이', temp: 22, status: '맑음', fineDust: '보통', humidity: 55, wind: 4.5 },
  { id: 'city_08', name: '창원', particle: '이', temp: 22, status: '바람', fineDust: '보통', humidity: 60, wind: 5.6 },
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
  const city = weatherList.value.find((item) => selectedCityInfo.value === `${item.name}${item.particle} 선택되었습니다.`)
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
    <BaseDashboardCard class="search-card">
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard class="weather-card">
      <div class="section-header">
        <h3>지역별 날씨 현황</h3>
        <span class="avg-temp">평균 {{ averageTemp }}°C</span>
      </div>

      <div class="weather-grid">
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          :game="gameByCity[item.name]"
          @select-card="(msg) => (selectedCityInfo = msg)"
          @click-detail="showDetail"
        />
      </div>

      <p v-if="filteredWeatherList.length === 0" class="empty-msg">
        검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <GameScheduleList :games="todayBaseballGames" />

    <transition name="fade">
      <div v-if="selectedCityInfo" class="status-bar">
        {{ selectedCityInfo }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  --bg: #f6f7f9;
  --surface: #ffffff;
  --border: #e7e9ee;
  --text-primary: #1c1f26;
  --text-secondary: #6b7280;
  --accent: #3b6ef6;
  --accent-soft: #eaf0ff;
  --danger: #e0554f;
  --danger-soft: #fdecec;
  --success-soft: #e7f7ef;
  --success-text: #1f8a53;

  max-width: 2000px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Apple SD Gothic Neo", sans-serif;
  color: var(--text-primary);
}

.search-card,
.weather-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.01em;
}

.avg-temp {
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 10px;
  border-radius: 999px;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-auto-rows: 1fr;
  gap: 12px;
}

.empty-msg {
  text-align: center;
  color: var(--danger);
  background: var(--danger-soft);
  padding: 14px 0;
  border-radius: 12px;
  font-size: 14px;
  margin-top: 12px;
}

.status-bar {
  background: var(--success-soft);
  color: var(--success-text);
  padding: 12px 16px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid rgba(31, 138, 83, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
