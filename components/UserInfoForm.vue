<template>
  <el-dialog
    v-model="visible"
    title="Edit user information"
    :destroy-on-close="true"
    width="490px"
  >
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
      label-position="top"
      size="large"
    >
      <el-form-item label="Nickname" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="Please enter your nickname"/>
      </el-form-item>
      <el-form-item label="Introduction" prop="intro">
        <el-input v-model="formData.intro" type="textarea" :rows="5" placeholder="Please enter your introduction"/>
      </el-form-item>
    </el-form>
    <template #footer>
        <el-button class="flex-1" @click="visible = false" size="large">Cancel</el-button>
        <el-button class="flex-1" type="primary" @click="handleSubmit" size="large">Submit</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {type ElForm, ElMessage} from "element-plus";
import {useUserStore} from "~/stores/modules/user";
import {modifyInfoApi} from "~/api/modules/mine/mine.ts";
import type {IMine} from "~/api/interface/mine/mine.ts";

defineOptions({
  name: 'UserInfoForm'
})

const userStore = useUserStore()
const formData = ref<IMine.ModifyQuery>({
  nickname: userStore.userInfo.nickname,
  intro: userStore.userInfo.intro
})
const rules = reactive({
  nickname: [{required: true, message: 'Please enter your nickname'}],
  // intro: [{required: true, message: 'Please enter your introduction'}],
})

const visible = ref(false)

// 接收父组件传过来的参数
const open = () => {
  visible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      await modifyInfoApi(formData.value)
      ElMessage.success('Modify user information success')
      await userStore.getUserEcho()
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

</style>