<template>
  <section class="error-section">
    <h1 class="error-title">{{ code }}</h1>
    <div class="error-btn">
      <div class="row gap-row-base">
        <div class="col-md-6 col-12">
          <el-button type="primary" size="large" class="w-full" @click="goBack">GO BACK</el-button>
        </div>
        <div class="col-md-6 col-12">
          <el-button type="primary" size="large" class="w-full" @click="goHome">HOME</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()
const err = useError()
const snap = shallowRef(err.value) // 拍一份只读快照
const code = computed(() => snap.value?.statusCode ?? 500)
const title = computed(() => {
  if (code.value === 404) return 'page not found'
  if (code.value === 403) return 'no access permission'
  return 'The server malfunctioned'
})

function goHome() {
  clearError({redirect: '/'})        // 清错并跳转
}

async function goBack() {
  clearError()
  router.back()
}

useSeoMeta({
  title: () => `${code.value} | ${title.value}`,
  robots: 'noindex, follow'                    // 错误页通常不希望被收录
})
</script>

<style scoped lang="scss">
.error-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .error-title {
    font-weight: bold;
    font-size: 41.66vw;
    color: var(--color-gray-200);
  }

  .error-btn {
    max-width: 100%;
    width: 620px;
    padding: 0 15px;
  }

  .error-title,
  .error-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

