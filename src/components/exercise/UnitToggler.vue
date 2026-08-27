<script setup>
import { useConfigStore } from '@/stores/configStore'
const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>
      날씨단위: <strong>{{ configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)' }}</strong>
    </span>
    <el-switch
      :model-value="configStore.unit === 'fahrenheit'"
      inline-prompt
      active-text="℉"
      inactive-text="℃"
      aria-label="날씨 단위 변경"
      @change="configStore.toggleUnit"
    />
  </div>
 </template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  text-align: center;
  white-space: nowrap;
}

.unit-toggler span {
  color: inherit;
  font-size: 13px;
}
</style>
