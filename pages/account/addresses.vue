<template>
  <div class="orders-container">
    <template v-if="addressList.length">
      <div class="acea-row row-right mb-30">
        <el-button size="large" @click="openAddEdit('Add a new address')">
          <span class="iconfont icon-add mr-10"></span>
          Add New Address
        </el-button>
      </div>
      <div class="address-list">
        <div class="address-item acea-row row-between-wrapper  gap-base pb-20 mb-20 border-b-sm border-gray-200"
             v-for="item in addressList"
             :key="item.id">
          <div class="flex-1 text-16">
            <p class="text-18 f-bold">{{ item.firstName }} {{ item.lastName }}
              <el-tag type="primary" v-if="item.defaultFlag === '0'">Default</el-tag>
            </p>
            <p class="my-18">{{ item.detail }}</p>
            <p class="acea-row row-middle">
              <span class="iconfont icon-phone mr-10 text-20"></span>
              <span>{{ item.mobile }}</span>
            </p>
          </div>
          <div class="row gap-row-base address-btn">
            <div class="col-sm-12 col-6">
              <el-button class="w-full" size="large" @click="openAddEdit('Edit address', item, false)">Edit</el-button>
            </div>
            <div class="col-sm-12 col-6">
              <el-button class="w-full" size="large" @click="deleteAddress(item.id)">Delete</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="text-center py-60" v-else>
      <span class="iconfont icon-location text-50"></span>
      <p class="text-20 f-bold mt-20">No Saved Addresses.</p>
      <p class="text-14 my-20">Add a new address method for faster checkout.</p>
      <el-button size="large" type="primary" @click="openAddEdit('Add a new address')">
        Add Address
      </el-button>
    </div>
  </div>
  <AddressInfo ref="addressInfoRef"/>
</template>

<script setup lang="ts">
import AddressInfo from "~/components/AddressInfoForm.vue";
import {
  addAddressApi,
  detailAddressApi,
  editAddressApi,
  getAddressListApi,
  removeAddressApi
} from "~/api/modules/address/address";
import type {IAddress} from "~/api/interface/address/address";
import {useHandleData} from "~/composables/useHandleData";

defineOptions({
  name: 'Addresses'
})

definePageMeta({
  auth: true
})

useSeoMeta({
  robots: 'noindex, nofollow'
})

onMounted(() => {
  getAddressList()
})

const addressList = ref<IAddress.Row[]>([])
const getAddressList = async () => {
  const {data} = await getAddressListApi()
  addressList.value = data
}

const addressInfoRef = ref<InstanceType<typeof AddressInfo>>()
const openAddEdit = async (title: string, row: any = {}, isAdd = true) => {
  if (!isAdd) {
    const record = await detailAddressApi(row?.id)
    row = record?.data
  }
  const params = {
    isAdd,
    title,
    row: {...row},
    api: isAdd ? addAddressApi : editAddressApi,
    getTableList: getAddressList
  }
  addressInfoRef.value?.acceptParams(params)
}

const deleteAddress = async (id: string) => {
  await useHandleData(
    removeAddressApi,
    id,
    'Are you sure to delete this address?',
  )
  await getAddressList()

}
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .address-btn {
    width: 100%;
  }
}
</style>