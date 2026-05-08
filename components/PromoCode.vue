<template>
  <el-dialog
    v-model="visible"
    width="665px"
    class="promo-dialog"
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="acea-row row-right">
        <SvgIcon name="close" class="text-20 cursor-pointer" @click="close" />
      </div>
    </template>
    <div class="text-center text-gray-700">
      <p class="text-16 text-gray-600 f-bold-500">Exclusive Offer From:</p>
      <img src="~/assets/images/logo2.png" alt="logo" class="inline-block mt-20" style="height: 46px;">
      <p class="text-30 f-bold-500 my-20">Get {{ couponDetail?.discountRate }} off your order</p>
      <p class="text-20 f-bold-500">{{ couponDetail?.expire }} {{ couponDetail?.unit }} Only - {{ couponDetail?.startTime }} - {{ couponDetail?.endTime }} HKT</p>
      <div class="acea-row row-between-wrapper border-sm border-dashed my-20 pl-22 pr-8 py-8 rounded-sm">
        <span class="text-26 f-bold-500 text-uppercase line1 flex-1 text-left mr-10">{{ couponDetail?.code }}</span>
        <el-button type="primary" size="large" @click="copyCode(couponDetail?.code)">
          <SvgIcon name="cut" class="mr-10 text-20" />
          Copy Code
        </el-button>
      </div>
      <p class="text-14 text-gray-600 cursor-pointer" @click="copyCode(couponDetail?.code)">Click to copy code</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {copyToClipboard} from "~/utils";
import {getCouponDetailApi} from "~/api/modules/coupon/coupon";
import type {ICoupon} from "~/api/interface/coupon/coupon";

const router = useRouter()
const visible = ref(false)

const copyCode = (text: string) => {
  copyToClipboard(text).then(() => {
    ElMessage.success('Copy successful')
    router.replace('/')
  }).catch(() => {
    ElMessage.error('Copy failed')
  })
}

// 接收父组件传过来的参数
const open = async (id: string) => {
  await getCouponDetail(id)
}

const couponDetail = ref({} as ICoupon.Row)
const getCouponDetail = async (id: string) => {
  try {
    const {data} = await getCouponDetailApi(id)
    couponDetail.value = data
    visible.value = true
  } catch (error) {
    router.replace('/')
  }
}

defineExpose({
  open
})
</script>

<style lang="scss">
.promo-dialog {
  border-radius: 24px;
  padding: 21px;
}
</style>