<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

const weatherDetails = {
  맑음: '맑고',
  비: '비가 내리고',
  흐림: '흐리고',
  바람: '바람이 불고',
  눈: '눈이 내리고',
}

const cityData = ref(null)

onMounted(() => {
  cityData.value = weatherStore.weatherList.find((item) => item.id === route.params.cityId) ?? null
  if (!cityData.value) return
  weatherStore.fetchWeather().then(() => {
    cityData.value = weatherStore.weatherList.find((item) => item.id === route.params.cityId) ?? null
  })
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

    <el-card v-if="cityData" class="info-card" shadow="never">
      <h1>{{ cityData.name }}{{ cityData.stadium }}</h1>
      <p class="summary">{{ weatherDetails[cityData.status] }} {{ getTemperatureDetail(cityData.temp) }} 날입니다.</p>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="주소">{{ cityData.address }}</el-descriptions-item>
        <el-descriptions-item label="기온">{{ displayTemp }}{{ configStore.unitSymbol }}</el-descriptions-item>
        <el-descriptions-item label="날씨">
          <el-tag effect="light">{{ cityData.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="습도">{{ cityData.humidity }}%</el-descriptions-item>
        <el-descriptions-item label="풍속">{{ cityData.wind }}m/s</el-descriptions-item>
        <el-descriptions-item label="미세먼지">{{ cityData.fineDust }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card v-else class="info-card" shadow="never">
      <h1>관측 정보를 찾을 수 없습니다.</h1>
      <p class="summary">요청한 도시 ID에 해당하는 임시 데이터가 없습니다.</p>
    </el-card>

    <el-button class="back-btn" type="primary" @click="router.push('/')">메인 대시보드로 돌아가기</el-button>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 680px;
  margin: 40px auto;
  padding: 20px;
}
.info-card {
  border: 1px solid #e7e9ee;
  border-radius: 8px;
}
.info-card :deep(.el-card__body) { padding: 28px; }
.eyebrow { margin: 0 0 8px; color: #3b6ef6; font-size: 13px; font-weight: 700; }
h1 { margin: 0; font-size: 24px; }
.summary { margin: 12px 0 24px; color: #6b7280; }
.back-btn {
  margin-top: 16px;
}
@media (max-width: 500px) { .detail-container :deep(.el-descriptions__body table) { table-layout: fixed; } }
</style>
