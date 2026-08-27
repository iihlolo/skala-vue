import axios from 'axios'

const AIRKOREA_API_KEY = import.meta.env.VITE_AIRKOREA_API_KEY
const AIRKOREA_ENDPOINT = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'

const SIDO_BY_REGION = {
  서울: '서울',
  인천: '인천',
  경기: '경기',
  대전: '대전',
  전남: '광주',
  대구: '대구',
  경남: '경남',
  부산: '부산',
}

const getFineDustStatus = (pm10Value) => {
  const value = Number(pm10Value)
  if (!Number.isFinite(value)) return null
  if (value <= 30) return '좋음'
  if (value <= 80) return '보통'
  if (value <= 150) return '나쁨'
  return '매우 나쁨'
}

export const fetchFineDustByStation = async (stationName, sidoName) => {
  if (!AIRKOREA_API_KEY) {
    throw new Error('VITE_AIRKOREA_API_KEY 환경변수가 설정되지 않았습니다.')
  }

  const requestedSido = sidoName ?? SIDO_BY_REGION[stationName.split(':')[0]] ?? stationName
  const response = await axios.get(AIRKOREA_ENDPOINT, {
    params: {
      serviceKey: decodeURIComponent(AIRKOREA_API_KEY),
      pageNo: 1,
      numOfRows: 100,
      returnType: 'json',
      sidoName: requestedSido,
      ver: '1.0',
    },
  })
  const result = response.data
  const items = result?.response?.body?.items ?? result?.body?.items ?? []
  const itemList = Array.isArray(items) ? items : [items]
  const item = itemList.find((candidate) => candidate.stationName === stationName) ?? itemList[0]
  const fineDust = getFineDustStatus(item?.pm10Value)

  if (!fineDust) {
    throw new Error(`${stationName} 측정소의 미세먼지 데이터가 없습니다.`)
  }

  return fineDust
}