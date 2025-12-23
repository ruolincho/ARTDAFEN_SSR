<template>
  <div class="countdown-wrapper">
    <ClientOnly>
      <div v-if="!isExpired" class="timer-container">
        <div class="time-block">
          <span class="number">{{ formatNum(display.days) }}</span>
          <span class="label">Day</span>
        </div>
        <span class="separator">:</span>
        <div class="time-block">
          <span class="number">{{ formatNum(display.hours) }}</span>
          <span class="label">Hr</span>
        </div>
        <span class="separator">:</span>
        <div class="time-block">
          <span class="number">{{ formatNum(display.minutes) }}</span>
          <span class="label">Min</span>
        </div>
        <span class="separator">:</span>
        <div class="time-block">
          <span class="number">{{ formatNum(display.seconds) }}</span>
          <span class="label">Sec</span>
        </div>
      </div>

      <div v-else class="expired-message">
        The Event Has Ended
      </div>

      <template #fallback>
        <div class="loading-placeholder">-- : -- : -- : --</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  // 毫秒级时间戳 (Number) 或 字符串数字
  endTime: {
    type: [Number, String],
    required: true
  }
})

// 'finish' 事件會在倒數歸零時觸發
const emit = defineEmits(['finish'])

// 状态定义
const timeLeft = ref(0)
const isExpired = ref(false)
let timer: number | null | NodeJS.Timeout = null

// 计算显示的天时分秒
const display = computed(() => {
  const ms = timeLeft.value

  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
})

// 补零函数 (例如 5 -> 05)
const formatNum = (num: number): string => {
  return num < 10 ? `0${num}` : String(num)
}

// 核心倒计时逻辑
const updateTimer = () => {
  const target = Number(props.endTime)
  const now = Date.now() // 获取当前绝对时间戳（即使用户在纽约，这里也是准的）
  const diff = target - now

  if (diff <= 0) {

    // 防止重複觸發：只有當狀態從「未過期」變為「過期」時才執行
    if (!isExpired.value) {
      timeLeft.value = 0
      isExpired.value = true
      if (timer) clearInterval(timer)
      emit('finish')
    }

  } else {
    timeLeft.value = diff
    isExpired.value = false
  }
}

// 生命周期
onMounted(() => {
  updateTimer() // 立即执行一次
  if (!isExpired.value) {
    timer = setInterval(updateTimer, 1000)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
  .countdown-wrapper {
    display: inline-block;
  }

  .timer-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .time-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #333;
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    min-width: 50px;
  }

  .number {
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
  }

  .label {
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.8;
    margin-top: 4px;
  }

  .separator {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .expired-message {
    color: #e74c3c;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
  }

  .loading-placeholder {
    opacity: 0.5;
    font-family: monospace;
  }
</style>