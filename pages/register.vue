<template>
  <div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20">
    <NuxtLink to="/">
      <img class="logo" src="~/assets/images/logo.png" alt="logo">
    </NuxtLink>
    <p class="text-20 text-center f-bold my-24">Let's get started!</p>
    <p class="text-center text-14 text-gray-600 mb-24">
      Create an account and get first access to the very best products,
      inspiration and community.
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
      <el-form-item label="Invite Code" prop="inviteCode" v-if="authToken">
        <el-input v-model="ruleForm.inviteCode" placeholder="Invite Code (Optional)"/>
      </el-form-item>
      <el-form-item prop="agree">
        <div class="acea-row row-top" style="line-height: normal;">
          <el-checkbox v-model="ruleForm.agree"/>
          <p class="flex-1 ml-8 text-14 text-gray-600">
            <span>Are you agree to Clicon</span>
            <NuxtLink class="text-secondary cursor-pointer"  to="/terms-and-conditions"> Terms of Condition </NuxtLink>
            <span>and</span>
            <NuxtLink class="text-secondary cursor-pointer"  to="privacy-policy"> Privacy Policy. </NuxtLink>
          </p>
        </div>
      </el-form-item>

      <el-button class="w-full mb-22" type="primary" @click="sendCode" v-if="!authToken">SEND CODE
        <span class="iconfont icon-right-arrow ml-8 text-16"></span>
      </el-button>

      <el-button class="w-full my-22" type="primary" @click="register" v-if="authToken">CREATE ACCOUNT
        <span class="iconfont icon-right-arrow ml-8 text-16"></span>
      </el-button>

    </el-form>
    <div class="acea-row row-middle text-14">
      <span class="text-gray-600">Already have an account?</span>
      <NuxtLink to="/login" class="text-secondary ml-6 cursor-pointer">Sign in</NuxtLink>
    </div>
  </div>
  <VerificationCode
    v-model:token="authToken"
    :sendOption="{
        username: ruleForm.username,
        ifExists: true
      }"
    ref="verificationCodeRef"
  />
</template>

<script setup lang="ts">
import {type ElForm} from "element-plus";
import { useAuth } from "~/composables/useAuth";
import {emailReg} from "~/regular";
import VerificationCode from "~/components/VerificationCode.vue";

defineOptions({
  name: 'Register '
})

const { registerFn } = useAuth()
const validateAgree = (rule: any, value: any, callback: any) => {
  if (!value) callback(new Error('Please agree to the terms and conditions'))
  callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (ruleForm.value.password !== value) callback(new Error('Passwords do not match'))
  callback()
}

const authToken = ref('')
const ruleForm = ref({
  username: '',
  password: '',
  rePassword: '',
  inviteCode: '',
  agree: false
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
  agree: [{validator: validateAgree}],
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
const register = () => {
  ruleFormRef.value!.validate((valid) => {
    if (!valid) return
    try {
      registerFn({ inviteCode: ruleForm.value.inviteCode, password: ruleForm.value.password }, authToken.value)
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