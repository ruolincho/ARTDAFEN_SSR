<template>
  <el-dialog
      v-model="visible"
      :destroy-on-close="true"
      width="424px"
      append-to-body
      class="wall-dialog"
      @opened="handleOpened"
  >
    <div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20">
      <img class="logo" src="~/assets/images/logo.png" alt="logo">
      <p class="text-20 text-center f-bold my-24">Welcome Back</p>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="360px"
          size="large"
          status-icon
          label-position="top"
      >
        <el-form-item label="Email Address" prop="username">
          <el-input v-model="ruleForm.username" placeholder="Please enter your email address"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <template #label>
            <span>Password</span>
            <NuxtLink class="cursor-pointer float-right text-secondary f-bold-500" to="/forget-password">Forget
              Password
            </NuxtLink>
          </template>
          <el-input v-model="ruleForm.password" type="password" placeholder="Please enter your password" show-password/>
        </el-form-item>
        <el-form-item label="Captcha" prop="captcha">
          <el-input v-model="ruleForm.captcha" placeholder="Please enter your captcha" maxlength="6">
            <template #suffix>
              <img class="captcha-img cursor-pointer" :src="captchaData.imgStream" alt="captcha"
                   @click="reloadCaptcha(true)">
            </template>
          </el-input>
        </el-form-item>
        <el-button class="w-full mb-22" type="primary" @click="handleLogin">
          SIGN IN
          <span class="iconfont icon-right-arrow ml-8 text-16"></span>
        </el-button>
      </el-form>
      <div class="acea-row row-middle text-14">
        <span class="text-gray-600">Don't have an account?</span>
        <NuxtLink to="/register" class="text-secondary ml-6 cursor-pointer">Create account</NuxtLink>
      </div>
      <el-divider><span class="text-gray-600 text-14">or</span></el-divider>
      <div v-if="isDev" class="other-login text-14 text-gray-600 border-sm border-gray-600 text-center cursor-pointer" @click="toGoogleAuth">
        <img class="icon" src="~/assets/images/google.png" alt="google">
        Login with Google
      </div>
      <div class="acea-row row-center-wrapper" v-else>
        <div :id="BUTTON_ID"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {getCaptchaImageApi} from "~/api/modules/oauth/oauth";
import type {IOauth} from "~/api/interface/oauth/oauth";
import type {ElForm} from "element-plus";
import {useAuth} from "~/composables/useAuth";
import {emailReg} from "~/regular";
import {HOME_URL, LOGIN_URL, STORAGE_BACK_URL} from "~/config";
import {useGoogleAuth} from "~/composables/useGoogleAuth";
import {isoDurationToSecondsStrict} from "~/utils/isoDurationToSeconds";

defineOptions({
  name: 'LoginWindow'
})

// 记录上次成功获取验证码的时间戳 (毫秒)
const lastFetchTime = ref(0)
const isDev = import.meta.env.MODE !== 'production'
const BUTTON_ID = 'google-login-button'
const {renderButton} = useGoogleAuth()
const route = useRoute()
const visible = ref(false)

const {loginFn} = useAuth()
const ruleForm = ref({
  username: '',
  password: '',
  captcha: '',
})
const rules = reactive({
  username: [
    {required: true, message: 'Please enter your email address'},
    {message: 'Please enter the correct email address', pattern: emailReg},
  ],
  password: [{required: true, message: 'Please enter your password'}],
  captcha: [{required: true, message: 'Please enter your captcha'}],
})
const captchaLoading = ref(false) // 图像验证码是否在请求中
const captchaData = ref<IOauth.CaptchaRow>({ // 验证码图像对象
  imgStream: '',
  uuid: '',
  duration: ''
})

/**
 * 请求图形验证码
 * @param force 是否强制刷新。点击图片、登录失败时传 true；弹窗打开检测时传 false
 */
const reloadCaptcha = async (force: boolean = false) => {
  if (captchaLoading.value) return

  // 判断是否可以使用缓存（非强制 + 有数据 + 格式正确）
  const hasData = !!(captchaData.value.imgStream && captchaData.value.duration)

  // 非强制刷新模式下，检查有效期
  if (!force && hasData) {
    try {
      // 解析有效期（秒 -> 毫秒）
      // 例如 PT2M -> 120s -> 120000ms
      const durationSeconds = isoDurationToSecondsStrict(captchaData.value.duration)

      // 减去 5 秒作为网络延迟缓冲
      const safeSeconds = durationSeconds - 5

      // 只有当剩余时间 > 0 时才进行有效期检查, 如果 safeSeconds <= 0，说明有效期极短或已过期，直接向下执行去刷新
      if (safeSeconds > 0) {
        const durationMs = safeSeconds * 1000
        const now = Date.now()
        const passedTime = now - lastFetchTime.value

        // 如果 过去的时间 < 有效期，说明还没过期
        if (passedTime < durationMs) {
          console.log('Captcha is still valid, skipping refresh.')
          return
        }
      }
    } catch (e) {
      console.warn('Duration check failed, forcing refresh:', e)
    }
  }

  // 发起请求（第一次、强制刷新、或已过期都会走到这里）
  captchaLoading.value = true
  try {
    const { data } = await getCaptchaImageApi()
    captchaData.value = data
    lastFetchTime.value = Date.now() // [关键] 更新时间戳
  } catch (error) {
    console.error(error)
  } finally {
    captchaLoading.value = false
  }
}

// 普通登录
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const handleLogin = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await loginFn({
        ...ruleForm.value,
        uuid: captchaData.value.uuid,
        channel: '0',
        component: true
      })
      visible.value = false
    } catch (e) {
      // 登录失败（可能是验证码错或过期），强制刷新验证码
      await reloadCaptcha(true)
    }
  });
}

// google登录
const toGoogleAuth = () => {
  if (import.meta.server) return
  const {$google} = useNuxtApp()
  let path = route.fullPath
  if (path === LOGIN_URL) path = HOME_URL
  $google.oAuth()
}

const open = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
}

const handleOpened = () => {
  renderButton(BUTTON_ID, true, close)
}

watch(
    () => visible.value,
    (isShow) => {
      if (isShow) {
        // 如果没过期，不会发请求；如果过期了或第一次加载，会发请求
        reloadCaptcha(false)
      }
    }
)

defineExpose({
  open
})
</script>

<style lang="scss">
  .wall-dialog {
    padding: 0 !important;

    .el-dialog__header {
      padding-bottom: 0 !important;
    }
  }
</style>

<style scoped lang="scss">
  .login-container {
    background: #fff;

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
    }

    .other-login {
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;

      .icon {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
      }
    }

    .captcha-img {
      width: 113px;
    }
  }
</style>