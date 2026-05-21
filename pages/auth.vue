<template>
  <div class="auth-container">
    <!-- 没有验证邮箱的状态 -->
    <div class="login-container rounded-sm shadow-lg lg:p-32 p-20" v-if="notVerified">
      <p class="text-20 text-center font-bold mb-16">Verify Your Email Address</p>
      <p class="text-center text-14 text-gray-600 mb-24">Kindly check your email inbox.</p>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        size="large"
        status-icon
        label-position="top"
      >
        <el-form-item label="Code" prop="code">
          <el-input v-model="ruleForm.code" placeholder="Please enter your code" maxlength="6"/>
        </el-form-item>
        <el-button class="w-full" type="primary" @click="handleVerify">
          VERIFY ME
          <SvgIcon name="right-arrow" class="ml-8" />
        </el-button>
      </el-form>
    </div>

    <template v-else>
      <!-- 正常加载状态 -->
      <div v-if="hasCode" class="loading-content">
        <div class="loading-animate">
          <div class="circle"></div>
          <img class="logo" src="~/assets/images/logo.png" alt="logo">
        </div>
        <p class="text-20 mt-24 text-gray-600">Authorizing, please wait...</p>
      </div>

      <!-- 缺少code的错误状态 -->
      <div v-else class="error-content">
        <div class="error-icon">
          <SvgIcon name="error-fill" />
        </div>
        <p class="text-20 mt-25 text-gray-600">Authorization failed</p>
        <el-button
          type="danger"
          size="large"
          class="mt-25"
          @click="retryAuth"
        >
          Retry Authorization
        </el-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import type {ElForm} from "element-plus";

definePageMeta({
  layout: 'blank',
})

const {loginFn} = useAuth()
const route = useRoute()
const hasCode = ref(true)
const notVerified = ref(false)
const uuid = ref('')
const ruleForm = ref({
  code: '',
})
const rules = reactive({
  code: [{required: true, message: 'Please enter your code'}],
})

onMounted(() => {
  if (route.query.code) {
    hasCode.value = true
    _init()
  } else {
    hasCode.value = false
  }
})

useSeoMeta({
  robots: 'noindex, nocache, noarchive, nofollow'
})

const _init = () => {
  loginFn({
    channel: '2',
    captcha: route.query.code as string,
    component: false,
    redirectUri: `https://artdafen.com/get-google-code.html`,
  })
    .then(() => {
    })
    .catch((data) => {
      // 邮箱未验证
      if (data.uuid) {
        uuid.value = data.uuid
        notVerified.value = true
      }
    })
}

const handleVerify = () => {
  loginFn({
    channel: '1',
    captcha: ruleForm.value.code,
    uuid: uuid.value,
    component: false,
  })
}

const retryAuth = () => {
  const { $google } = useNuxtApp()
  $google.oAuth()
}
</script>

<style scoped lang="scss">
.login-container {
  width: 420px;
  max-width: 100%;
}

.auth-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;

  .loading-content {
    text-align: center;

    .loading-animate {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto;

      .circle {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 4px solid transparent;
        border-radius: 50%;
        border-top-color: var(--color-primary);
        animation: rotate 1s linear infinite;
      }

      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-content {
  text-align: center;

  .error-icon {
    color: var(--color-error);
    width: 80px;
    height: 80px;
    animation: pulse 2s infinite;
    margin: auto;

    .iconify {
      font-size: 80px;
    }
  }

  p {
    font-size: 20px;
    margin-top: 24px;
    color: #666;
    font-weight: 500;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
</style>