import axios from 'axios'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org'
const CITY_QUERY_BY_REGION = {
  서울: 'Seoul',
  경기: 'Suwon',
  인천: 'Incheon',
  대전: 'Daejeon',
  전남: 'Gwangju',
  대구: 'Daegu',
  경남: 'Changwon',
  부산: 'Busan',
}

const getApiParams = (extraParams = {}) => ({
  ...extraParams,
  appid: OPENWEATHER_API_KEY,
})

const getCoordinates = async (address) => {
  const queries = [address]
  const region = address.split(' ')[0]
  const fallbackQuery = CITY_QUERY_BY_REGION[region]
  if (fallbackQuery) queries.push(fallbackQuery)

  let location
  for (const query of queries) {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/geo/1.0/direct`, {
      params: getApiParams({ q: query, limit: 1 }),
    })
    location = response.data[0]
    if (location) break
  }

  if (!location) {
    throw new Error(`주소의 위치를 찾을 수 없습니다: ${address}`)
  }

  return { lat: location.lat, lon: location.lon }
}

const getWeatherData = async ({ lat, lon }) => {
  const response = await axios.get(`${OPENWEATHER_BASE_URL}/data/2.5/weather`, {
    params: getApiParams({ lat, lon, units: 'metric', lang: 'kr' }),
  })

  return response.data
}

const getAirQualityData = async ({ lat, lon }) => {
  const response = await axios.get(`${OPENWEATHER_BASE_URL}/data/2.5/air_pollution`, {
    params: getApiParams({ lat, lon }),
  })

  return response.data.list?.[0]
}

const toWeatherStatus = (weatherMain) => {
  const statusMap = {
    Clear: '맑음',
    Clouds: '흐림',
    Drizzle: '비',
    Rain: '비',
    Snow: '눈',
    Thunderstorm: '비',
  }

  return statusMap[weatherMain] ?? '바람'
}

const toFineDustStatus = (aqi) => {
  const statusMap = {
    1: '좋음',
    2: '보통',
    3: '나쁨',
    4: '매우 나쁨',
    5: '매우 나쁨',
  }

  return statusMap[aqi] ?? '정보 없음'
}

export const fetchWeatherByAddress = async (address) => {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('VITE_OPENWEATHER_API_KEY 환경변수가 설정되지 않았습니다.')
  }

  const coordinates = await getCoordinates(address)
  const weather = await getWeatherData(coordinates)
  const airQuality = await getAirQualityData(coordinates)
  const currentWeather = weather.weather?.[0]

  return {
    temp: Math.round(weather.main.temp * 10) / 10,
    status: toWeatherStatus(currentWeather?.main),
    fineDust: toFineDustStatus(airQuality?.main?.aqi),
    humidity: weather.main.humidity,
    wind: Math.round(weather.wind.speed * 10) / 10,
  }
}