<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    width="424px"
    append-to-body
    class="wall-dialog"
  >
    <div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20">
      <router-link to="/">
        <img class="logo" src="~/assets/images/logo.png" alt="logo">
      </router-link>
      <p class="text-20 text-center f-bold my-24">
        <template v-if="!authToken">Reset Password</template>
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
          <el-input v-model="ruleForm.username" placeholder="Please enter your email address" disabled/>
        </el-form-item>
        <el-form-item label="Password" prop="password" v-if="authToken">
          <el-input v-model="ruleForm.password" type="password" placeholder="Please enter your password" show-password/>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="rePassword" v-if="authToken">
          <el-input v-model="ruleForm.rePassword" type="password" placeholder="Please confirm your password" show-password/>
        </el-form-item>

        <el-button class="w-full" type="primary" @click="sendCode" v-if="!authToken">
          SEND CODE
          <span class="iconfont icon-right-arrow ml-8 text-16"></span>
        </el-button>

        <el-button class="w-full" type="primary" @click="resetPassword" v-if="authToken">
          RESET PASSWORD
          <span class="iconfont icon-right-arrow ml-8 text-16"></span>
        </el-button>
      </el-form>
    </div>
  </el-dialog>
  <VerificationCode
    v-model:token="authToken"
    :sendOption="{}"
    ref="verificationCodeRef"
  />
</template>

<script setup lang="ts">
import {type ElForm, ElMessage} from "element-plus";
import VerificationCode from "~/components/VerificationCode.vue";
import {useAuth} from "~/composables/useAuth";
import {emailReg} from "~/regular";
import {useUserStore} from "~/stores/modules/user";

defineOptions({
  name: 'ResetPasswordWindow'
})

const visible = ref(false)

const userStore = useUserStore()
const { resetPasswordFn, logoutFn } = useAuth()

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
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      await resetPasswordFn({ channel: '0', password: ruleForm.value.password }, authToken.value)
      ElMessage.success('Password reset successfully')
      logoutFn()
    } catch (error) {
      console.log(error)
    }
  })
}

const open = () => {
  ruleForm.value.username = userStore.userInfo.email!
  visible.value = true
}

defineExpose({
  open
})
</script>

<style lang="scss">
.wall-dialog {
  padding: 0;
  .el-dialog__header {
    padding-bottom: 0;
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
    }

    .el-checkbox {
      height: unset;
    }
  }

}
</style>