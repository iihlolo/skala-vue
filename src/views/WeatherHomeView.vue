<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { baseballGames } from '../data/baseballData'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'

const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

const searchQuery = ref('')
const defaultCityInfo = '카드를 클릭하거나 검색해 보세요.'
const selectedCityInfo = ref(defaultCityInfo)

onMounted(() => weatherStore.fetchWeather())

const resetSelectedCity = () => {
  selectedCityInfo.value = defaultCityInfo
}

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return weatherStore.weatherList
  return weatherStore.weatherList.filter((item) =>
    [item.name, item.address, item.stadium].some((field) => field?.toLowerCase().includes(query)),
  )
})

const todayBaseballGames = computed(() =>
  baseballGames.map((game) => {
    const weather = weatherStore.weatherList.find((item) => item.name === game.city)
    return { ...game, stadium: weather?.stadium, gameStatus: weather?.status === '비' ? '우취' : '경기' }
  }),
)

const gameByCity = computed(() => Object.fromEntries(todayBaseballGames.value.map((game) => [game.city, game])))

const averageTemp = computed(() => {
  const total = weatherStore.weatherList.reduce((sum, item) => sum + item.temp, 0)
  return Math.round((total / weatherStore.weatherList.length) * 10) / 10
})

const displayAverageTemp = computed(() => {
  const rawTemp = averageTemp.value // 기본 원본 데이터는 섭씨 숫자
  if (configStore.unit === 'fahrenheit') {
    return Math.round(((rawTemp * 9) / 5 + 32) * 10) / 10 // 화씨 변환 연산
  }
  return rawTemp // 'celsius'일 때는 원본 그대로 반환
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="dashboard-wrapper" @click="resetSelectedCity">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard class="weather-card">
      <div class="section-header">
        <h3>지역별 날씨 현황</h3>
        <span class="avg-temp">평균 {{ displayAverageTemp }}{{ configStore.unitSymbol }}</span>
      </div>
      <div class="weather-grid">
        <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" :game="gameByCity[item.name]" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="handleDetailJump(item.id)" />
      </div>
      <p v-if="filteredWeatherList.length === 0" class="empty-msg">검색 결과와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>
    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  max-width: 2000px;
  width: 100%;
  padding: 20px;
}
.weather-card { margin: 16px 0; padding: 20px; background: #fff; border: 1px solid #e7e9ee; border-radius: 8px; }
.section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; }
.section-header h3 { margin: 0; font-size: 16px; }
.avg-temp { color: #3b6ef6; font-size: 13px; font-weight: 600; }
.weather-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.empty-msg { margin: 12px 0 0; color: #c53d33; text-align: center; }
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
</style>
