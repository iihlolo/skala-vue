import { ref } from 'vue'
import { defineStore } from 'pinia'

import { fetchWeatherByAddress } from '@/api/weatherApi'
import { fetchFineDustByStation } from '@/api/airKoreaApi'
import { stadiumList } from '@/data/stadiumData'
import { weatherFallbackList } from '@/data/weatherFallbackData'

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref(
    stadiumList.map((stadium) => ({
      ...stadium,
      ...weatherFallbackList.find((weather) => weather.id === stadium.id),
    })),
  )
  const isLoading = ref(false)
  const error = ref('')

  const fetchWeather = async () => {
    isLoading.value = true
    error.value = ''

    let successCount = 0
    const results = await Promise.all(
      weatherList.value.map(async (item) => {
        const [weatherResult, fineDustResult] = await Promise.allSettled([
          fetchWeatherByAddress(item.address),
          fetchFineDustByStation(item.msrstnNm, item.sidoName),
        ])
        const nextItem = { ...item }

        if (weatherResult.status === 'fulfilled') Object.assign(nextItem, weatherResult.value)
        if (fineDustResult.status === 'fulfilled') nextItem.fineDust = fineDustResult.value

        if (weatherResult.status === 'fulfilled' || fineDustResult.status === 'fulfilled') {
          successCount += 1
        } else {
          console.error(`${item.name} 실시간 API 요청 실패:`, weatherResult.reason, fineDustResult.reason)
        }

        return nextItem
      }),
    )

    weatherList.value = results
    if (successCount === 0) {
      error.value = '실시간 날씨를 불러오지 못해 기본 데이터를 표시합니다.'
    }
    isLoading.value = false
  }

  return { weatherList, isLoading, error, fetchWeather }
})