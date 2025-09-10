<template>
  <div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20">
    <NuxtLink to="/">
      <img class="logo" src="~/assets/images/logo.png" alt="logo">
    </NuxtLink>

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
            <NuxtLink class="cursor-pointer float-right text-secondary f-bold-500" to="/forget-password">Forget Password</NuxtLink>
        </template>
        <el-input v-model="ruleForm.password" type="password" placeholder="Please enter your password" show-password />
      </el-form-item>
      <el-form-item label="Captcha" prop="captcha">
        <el-input v-model="ruleForm.captcha" placeholder="Please enter your captcha" maxlength="6">
          <template #suffix>
            <img class="captcha-img cursor-pointer" :src="captchaData.imgStream" alt="captcha" @click="reloadCaptcha()">
          </template>
        </el-input>
      </el-form-item>
      <el-button class="w-full mb-22" type="primary" :loading="submitting" @click="handleLogin">
        SIGN IN
        <span class="iconfont icon-right-arrow ml-8 text-16"></span>
      </el-button>
    </el-form>
    <div class="acea-row row-middle text-14">
      <span class="text-gray-600">Don't have an account?</span>
      <NuxtLink to="/register" class="text-secondary ml-6 cursor-pointer">Create account</NuxtLink>
    </div>
    <el-divider><span class="text-gray-600 text-14">or</span></el-divider>
    <div class="other-login text-14 text-gray-600 border-sm border-gray-600 text-center cursor-pointer" @click="toGoogleAuth">
      <img class="icon" src="~/assets/images/google.png" alt="google">
      Login with Google
    </div>
  </div>
</template>

<script setup lang="ts">
import {getCaptchaImageApi} from "~/api/modules/oauth/oauth";
import type {IOauth} from "~/api/interface/oauth/oauth";
import type {ElForm} from "element-plus";
import { useAuth } from "~/composables/useAuth";
import {emailReg} from "~/regular";
import {HOME_URL, STORAGE_BACK_URL} from "~/config";

defineOptions({
  name: 'Login'
})

onMounted(() => {
  reloadCaptcha()
})

const { loginFn } = useAuth()
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
})
// 请求图形验证码
const reloadCaptcha = async () => {
  if (captchaLoading.value) return
  captchaLoading.value = true
  const { data } = await getCaptchaImageApi()
  captchaData.value = data
  captchaLoading.value = false
}

const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const submitting = ref(false)
const handleLogin = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      submitting.value = true
      await loginFn({
        ...ruleForm.value,
        uuid: captchaData.value.uuid,
        channel: '0'
      })
    } catch (e) {
      await reloadCaptcha()
    } finally {
      submitting.value = false
    }
  });
}

// google登录
const toGoogleAuth = () => {
  const { $google } = useNuxtApp()
  window.localStorage.setItem(STORAGE_BACK_URL, HOME_URL)
  $google.oAuth()
}
</script>

<style scoped lang="scss">
.login-container {
  max-width: 424px;
  margin: 5.72vw auto;

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