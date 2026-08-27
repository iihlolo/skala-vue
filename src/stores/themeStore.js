import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // 1. state: 다크 모드 여부 (초기값은 false = 라이트 모드)
  const isDarkMode = ref(false)

  // 2. getters: 다크 모드 상태에 맞춰 화면에 표시할 라벨
  const darkModeLabel = computed(() => (isDarkMode.value ? '다크 모드' : '라이트 모드'))

  // 3. actions: 다크 모드를 토글하는 함수
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    isDarkMode,
    darkModeLabel,
    toggleDarkMode,
  }
})
