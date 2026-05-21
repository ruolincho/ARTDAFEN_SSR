<template>
  <div class="login-container rounded-sm shadow-lg lg:p-32 p-20">
    <NuxtLink to="/">
      <img class="logo" src="~/assets/images/logo.png" alt="logo">
    </NuxtLink>
    <p class="text-20 text-center font-bold my-24">
      <template v-if="!authToken">Forget Password</template>
      <template v-else>Reset Password</template>
    </p>
    <p class="text-center text-14 text-gray-600 mb-24">
      <template v-if="!authToken">Enter the email address or mobile phone number associated with your Clicon account.
      </template>
      <template v-else>Duis sagittis molestie tellus, at eleifend sapien pellque quis. Fusce lorem nunc, fringilla sit
        amet nunc.
      </template>
    </p>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="360px"
      size="large"
      status-icon
      label-position="top"
    >
      <el-form-item label="Email Address" prop="username" v-if="!authToken">
        <el-input v-model="ruleForm.username" placeholder="Please enter your email address"/>
      </el-form-item>
      <el-form-item label="Password" prop="password" v-if="authToken">
        <el-input v-model="ruleForm.password" type="password" placeholder="Please enter your password" show-password/>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="rePassword" v-if="authToken">
        <el-input v-model="ruleForm.rePassword" type="password" placeholder="Please confirm your password" show-password/>
      </el-form-item>

      <el-button class="w-full mb-22" type="primary" @click="sendCode" v-if="!authToken">
        SEND CODE
        <SvgIcon name="right-arrow" class="ml-8" />
      </el-button>

      <el-button class="w-full mb-22" type="primary" @click="resetPassword" v-if="authToken">
        RESET PASSWORD
        <SvgIcon name="right-arrow" class="ml-8" />
      </el-button>
    </el-form>
    <div class="acea-row row-middle text-14">
      <span class="text-gray-600">Already have an account?</span>
      <NuxtLink to="/login" class="text-secondary ml-6 cursor-pointer">Sign in</NuxtLink>
    </div>
    <div class="acea-row row-middle text-14 mt-8">
      <span class="text-gray-600">Don’t have account?</span>
      <NuxtLink to="/register" class="text-secondary ml-6 cursor-pointer">Sign Up</NuxtLink>
    </div>
    <div class="text-14 text-gray-600 pt-24 mt-24 border-t  ">You may contact <a :href="`mailto:${CONTACT_EMAIL}`"
      class="text-primary cursor-pointer font-bold">Customer Service</a> for help restoring access to your account.
    </div>
  </div>
  <VerificationCode
    v-model:token="authToken"
    :sendOption="{
        username: ruleForm.username,
        ifExists: false
      }"
    ref="verificationCodeRef"
  />
</template>

<script setup lang="ts">
import {type ElForm, ElMessage} from "element-plus";
import VerificationCode from "~/components/VerificationCode.vue";
import {useAuth} from "~/composables/useAuth";
import {emailReg} from "~/regular";
import {CONTACT_EMAIL, LOGIN_URL} from "~/config";
import {resolvePageMeta} from "~/config/pageMeta";

defineOptions({
  name: 'ResetPassword'
})

const router = useRouter()
const { resetPasswordFn } = useAuth()

useHead(resolvePageMeta("/forget-password"));

const validatePassword = (rule: any, value: any, callback: any) => {
  if (ruleForm.value.password !== value) callback(new Error('Passwords do not match'))
  callback()
}

const authToken = ref('')
const ruleForm = ref({
  username: '',
  password: '',
  rePassword: '',
})

const rules = reactive({
  username: [
    {required: true, message: 'Please enter your email address'},
    {message: 'Please enter the correct email address', pattern: emailReg},
  ],
  password: [{required: true, message: 'Please enter your password'}],
  rePassword: [
    {required: true, message: 'Please confirm your password'},
    {validator: validatePassword}
  ],
})

const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const verificationCodeRef = ref<InstanceType<typeof VerificationCode>>()
const sendCode = () => {
  ruleFormRef.value!.validate((valid) => {
    if (!valid) return
    try {
      verificationCodeRef.value?.open()
    } catch (error) {
      console.log(error)
    }
  })
}
const resetPassword = () => {
  ruleFormRef.value!.validate((valid) => {
    if (!valid) return
    try {
      resetPasswordFn({ channel: '0', password: ruleForm.value.password }, authToken.value)
      ElMessage.success('Password reset successfully')
      router.replace(LOGIN_URL)
    } catch (error) {
      console.log(error)
    }
  })
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

    .el-checkbox {
      height: unset;
    }
  }

}
</style>