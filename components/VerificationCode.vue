<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="true"
    width="420px"
  >
    <template #title>
      <p class="text-20 text-center f-bold mt-16">Verify Your Email Address</p>
    </template>
    <p class="text-center text-14 text-gray-600 mb-24">Kindly check your email inbox.</p>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      size="large"
      status-icon
      label-position="top"
    >
      <el-form-item label="Verification Code" prop="captcha">
        <template #label>
          <span>Verification Code</span>
          <p class="float-right text-secondary f-bold-500">
            <span class="cursor-pointer" v-if="!isShowCountDown" @click.stop="sendCode">Resend Code</span>
            <span v-else>Retrieve again in {{ appStore.codeCountDown }} seconds</span>
          </p>
        </template>
        <el-input v-model="ruleForm.captcha" :maxlength="6"
                  placeholder="Please enter the verification captcha sent to your email address"/>
      </el-form-item>
      <el-button class="w-full mb-22" type="primary" @click="verifyCode">
        VERIFY ME
        <span class="iconfont icon-right-arrow ml-8 text-16"></span>
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import type {IOauth} from "~/api/interface/oauth/oauth";
import {type ElForm} from "element-plus";
import {useAppStore} from "~/stores/modules/app";

defineOptions({
  name: 'VerificationCode'
})

onMounted(() => {
  appStore.resumeCountdown();
})

// 定义 Props
interface Props {
  sendOption: IOauth.SendCodeQuery;
}

const props = withDefaults(defineProps<Props>(), {
  sendOption: undefined
});

const emit = defineEmits<{
  'update:token': [value: string];
}>();


const appStore = useAppStore()
const {sendCodeFn, verifyCodeFn} = useAuth()


const visible = ref(false)

const ruleForm = ref({
  captcha: '',
})

const rules = reactive({
  captcha: [{required: true, message: 'Please enter the verification captcha sent to your email address'}],
})

const sendCode = async () => {
  if (isShowCountDown.value) return
  try {
    await sendCodeFn(props.sendOption)
    appStore.startCodeCountDown(60);
  } catch (error) {
    visible.value = false
  }
}

const open = () => {
  visible.value = true
  sendCode()
}

const isShowCountDown = computed(() => appStore.codeCountDown > 0) // 是否显示倒计时

const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const verifyCode = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      const params: IOauth.VerifyCodeQuery = {captcha: ruleForm.value.captcha}
      if (props.sendOption.username) params.username = props.sendOption.username
      const authToken = await verifyCodeFn(params)
      emit('update:token', authToken);
      visible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">
.el-form {
  :deep(.el-form-item__label) {
    display: block;
    width: auto;
  }
}
</style>