<template>
  <section>
    <div class="text-24 f-bold mb-md-20 mb-15">Account Details</div>

    <div class="p-20 shadow-lg rounded-sm mb-15">
      <div class="acea-row row-between-wrapper mb-20 f-bold">
        <span class="text-18">My Profile</span>
        <span class="text-14 cursor-pointer" @click="handleEditProfile">Edit</span>
      </div>
      <div class="row gap-row-base text-16">
        <div class="col-sm-4 col-12">
          <div class="mb-10 f-bold">Nickname</div>
          <div>{{ userStore.userInfo.nickname }}</div>
        </div>
        <div class="col-sm-4 col-12">
          <div class="mb-10 f-bold">Email</div>
          <div>{{ userStore.userInfo.email }}</div>
        </div>
        <div class="col-sm-4 col-12">
          <div class="mb-10 f-bold">Introduction</div>
          <div>{{ userStore.userInfo.intro }}</div>
        </div>
      </div>
    </div>

    <div class="p-20 shadow-lg rounded-sm mb-15">
      <div class="acea-row row-between-wrapper mb-20 f-bold">
        <span class="text-18">Password</span>
        <span class="text-14 cursor-pointer" @click="handleEditPassword">Edit</span>
      </div>
      <div class="row gap-row-base text-16">
        <div class="col-sm-4 col-12">
          <div class="mb-10 f-bold">Password</div>
          <div>••••••••</div>
        </div>
      </div>
    </div>

    <UserInfoForm ref="userInfoFormRef"/>
    <ResetPasswordWindow ref="resetPasswordWindowRef"/>
  </section>
  
</template>

<script setup lang="ts">
import {useUserStore} from "~/stores/modules/user";
import UserInfoForm from '~/components/UserInfoForm.vue'
import ResetPasswordWindow from '~/components/ResetPasswordWindow.vue'

defineOptions({
  name: 'Profile'
})

definePageMeta({
  auth: true
})

onMounted(() => {
  userStore.getUserEcho()
})

const userStore = useUserStore()
const userInfoFormRef = ref<InstanceType<typeof UserInfoForm>>()
const handleEditProfile = () => {
  userInfoFormRef.value?.open()
}

const resetPasswordWindowRef = ref<InstanceType<typeof ResetPasswordWindow>>()
const handleEditPassword = () => {
  resetPasswordWindowRef.value?.open()
}
</script>

<style scoped lang="scss"></style>