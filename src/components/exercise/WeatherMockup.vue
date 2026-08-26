<script setup>
import { ref, computed } from 'vue'
import WeatherCard from './WeatherCard.vue'

// 4일차 API 연동을 대비한 가상의 백엔드 데이터 배열 (v-for 및 :key 실습용)
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

const baseballGames = [
  { city: '서울', awayTeam: 'NC', homeTeam: '두산' },
  { city: '인천', awayTeam: 'KT', homeTeam: 'SSG' },
  { city: '대전', awayTeam: '삼성', homeTeam: '한화' },
  { city: '광주', awayTeam: '키움', homeTeam: '기아' },
  { city: '부산', awayTeam: 'LG', homeTeam: '롯데' },
]

// 검색어 및 알림창 제어용 데이터 (v-model 대용 한글 처리 및 이벤트 실습용)
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 검색어에 맞는 도시만 캐때링하는 연산기
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

// 알림 대행 함수 (window 객체 격리 우회)
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <!-- input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" / -->
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="검색할 도시 이름 입력" />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" :game="gameByCity[item.name]" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="showDetail" />
    </section>

    <section class="mockup-box">
      <h3>오늘의 야구 경기</h3>
      <div v-for="game in todayBaseballGames" :key="game.city" class="game-row">
        <strong>{{ game.city }}</strong>
        <span>{{ game.awayTeam }} vs {{ game.homeTeam }}</span>
        <b :class="game.gameStatus === '우취' ? 'cancelled' : 'scheduled'">{{ game.gameStatus }}</b>
      </div>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.mockup-box {
  padding: 18px;
  margin-bottom: 15px;
  color: #ffffff;
  background: linear-gradient(135deg, #087f8c, #1098ad);
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(8, 127, 140, 0.2);
}

.mockup-box h3 {
  margin-top: 0;
}

.game-row {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.28);
}

.game-row b {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.scheduled {
  color: #087f8c;
  background: #ffffff;
}

.cancelled {
  color: #8d2f2f;
  background: #ffd6d6;
}
</style>
