<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { weatherList } from '../data/weatherData'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const weatherDetails = {
  맑음: '맑고',
  비: '비가 내리고',
  흐림: '흐리고',
  바람: '바람이 불고',
  눈: '눈이 내리고',
}

const cityData = ref(null)

onMounted(() => {
  cityData.value = weatherList.find((item) => item.id === route.params.cityId) ?? null
})

const displayTemp = computed(() => {
  const rawTemp = cityData.value?.temp // 기본 원본 데이터는 섭씨 숫자
  if (rawTemp == null) return rawTemp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp // 'celsius'일 때는 원본 그대로 반환
})

const getTemperatureDetail = (temp) => (temp >= 25 ? '더운' : temp >= 20 ? '따뜻한' : temp < 10 ? '추운' : '선선한')
</script>

<template>
  <div class="detail-container">
    <p class="eyebrow">지역별 상세 기상관측</p>

    <div v-if="cityData" class="info-card">
      <h1>{{ cityData.name }} {{ cityData.stadium }}</h1>
      <p class="summary">{{ weatherDetails[cityData.status] }} {{ getTemperatureDetail(cityData.temp) }} 날입니다.</p>
      <dl>
        <div><dt>주소</dt><dd>{{ cityData.address }}</dd></div>
        <div><dt>기온</dt><dd>{{ displayTemp }}{{ configStore.unitSymbol }}</dd></div>
        <div><dt>날씨</dt><dd>{{ cityData.status }}</dd></div>
        <div><dt>습도</dt><dd>{{ cityData.humidity }}%</dd></div>
        <div><dt>풍속</dt><dd>{{ cityData.wind }}m/s</dd></div>
        <div><dt>미세먼지</dt><dd>{{ cityData.fineDust }}</dd></div>
      </dl>
    </div>
    <div v-else class="info-card">
      <h1>관측 정보를 찾을 수 없습니다.</h1>
      <p class="summary">요청한 도시 ID에 해당하는 임시 데이터가 없습니다.</p>
    </div>

    <button @click="router.push('/')" class="back-btn">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 680px;
  margin: 40px auto;
  padding: 20px;
}
.info-card {
  padding: 28px;
  background: white;
  border: 1px solid #e7e9ee;
  border-radius: 8px;
}
.eyebrow { margin: 0 0 8px; color: #3b6ef6; font-size: 13px; font-weight: 700; }
h1 { margin: 0; font-size: 24px; }
.summary { margin: 12px 0 24px; color: #6b7280; }
dl { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; border-top: 1px solid #e7e9ee; }
dl div { padding: 14px 0; border-bottom: 1px solid #e7e9ee; }
dt { color: #6b7280; font-size: 13px; }
dd { margin: 4px 0 0; font-weight: 600; }
.back-btn {
  margin-top: 16px;
  padding: 8px 12px;
  background: #3b6ef6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
@media (max-width: 500px) { dl { grid-template-columns: 1fr; } }
</style>
