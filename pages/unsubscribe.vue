<template>
  <div class="auth-container">

    <div class="loading-content" v-if="!requestComplete">
      <div class="loading-animate">
        <div class="circle"></div>
        <img class="logo" src="~/assets/images/logo.png" alt="logo">
      </div>
      <p class="text-20 mt-24 text-gray-600">Cancel subscription, please wait...</p>
    </div>

    <div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" v-else>
      <router-link to="/">
        <img class="logo" src="~/assets/images/logo.png" alt="logo">
      </router-link>
      <h1 class="text-20 text-center f-bold my-24">

        <template v-if="isSuccess">Unsubscribed Successfully</template>
        <template v-else>Unsubscribe Failed</template>
      </h1>
      <p class="text-center text-14 text-gray-600 mb-24">
        <template v-if="isSuccess">You've been unsubscribed. We will no longer send emails to {{ email }}.</template>
        <template v-else>Something went wrong on our end. Please try again later.</template>
      </p>
      <el-button class="w-full" type="primary" size="large" @click="router.replace('/')">
        OKAY
        <SvgIcon name="right-arrow" class="ml-8" />
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {unsubscribeApi} from "~/api/modules/message/message";
import {useUserStore} from "~/stores/modules/user";

definePageMeta({
  layout: 'blank',
})

onMounted(() => {
  const token = route.query.token
  if (!token) return router.replace('/')
  unsubscribe(token)
})

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const requestComplete = ref(false)
const isSuccess = ref(false)
const email = ref('')
const unsubscribe = async (token: string) => {
  try {
   const { data } = await unsubscribeApi({ token })
    isSuccess.value = true
    email.value = data
    userStore.updateSubscribe('1')
    setTimeout(() => router.replace('/'), 2000)
  } catch (e) {
    isSuccess.value = false
  }
  finally {
    requestComplete.value = true
  }
}
</script>

<style scoped lang="scss">
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

    .login-container {

      max-width: 400px;

      .logo {
        display: block;
        width: 60px;
        height: 60px;
        margin: auto;
      }

      .el-form {
        :deep(.el-form-item__label) {
          display: block;
          width: auto;
        }

        .el-checkbox {
          height: unset;
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
</style>