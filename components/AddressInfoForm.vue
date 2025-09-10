<template>
  <el-dialog
    v-model="visible"
    :title="`${paramsProps.title}`"
    :destroy-on-close="true"
    width="490px"
  >
    <el-form
      ref="ruleFormRef"
      label-width="140px"
      label-suffix=" :"
      label-position="top"
      :rules="rules"
      :model="paramsProps.row"
      @submit.enter.prevent="handleSubmit"
    >
      <el-form-item label="First Name" prop="firstName">
        <el-input
          v-model="paramsProps.row.firstName"
          placeholder="Enter First Name"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastName">
        <el-input
          v-model="paramsProps.row.lastName"
          placeholder="Enter Last Name"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Mobile" prop="mobile">
        <el-input
          v-model="paramsProps.row.mobile"
          placeholder="Enter Mobile Number"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Country/Region" prop="country">
        <el-select
          v-model="paramsProps.row.country"
          filterable
          @change="getState(true)"
        >
          <el-option
            v-for="item in countryOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="State/Province/Region" prop="state" v-if="stateOptions.length || paramsProps.row.state">
        <el-select
          v-model="paramsProps.row.state"
          filterable
          no-data-text="Please select a country/region first"
        >
          <el-option
            v-for="item in stateOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="City" prop="city">
        <el-input
          v-model="paramsProps.row.city"
          placeholder="Enter City"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Street Address" prop="detail">
        <el-input
          v-model="paramsProps.row.detail"
          placeholder="Street address or P.O. Box,Apt, suite, unit, building, floor, etc."
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Zip Code" prop="zip">
        <el-input
          v-model="paramsProps.row.zip"
          placeholder="Enter Zip Code"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="paramsProps.row.defaultFlag"
          label="Use as my default address"
          true-value="0"
          false-value="1"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="acea-row">
        <el-button class="flex-1" @click="visible = false" size="large">Cancel</el-button>
        <el-button class="flex-1" type="primary" @click="handleSubmit" size="large">Submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {type ElForm, ElMessage} from "element-plus";
import {getCountryOptionApi, getStateOptionApi} from "~/api/modules/map/map";
import type {IMap} from "~/api/interface/map/map";

defineOptions({
  name: 'AddressInfoForm'
})

onMounted(() => {
  getCountry()
})

const rules = reactive({
  firstName: [{required: true, message: 'Please enter first name'}],
  lastName: [{required: true, message: 'Please enter last name'}],
  mobile: [{required: true, message: 'Please enter mobile number'}],
  country: [{required: true, message: 'Please select country/region'}],
  detail: [{required: true, message: 'Please enter street address'}],
  city: [{required: true, message: 'Please enter city'}],
  state: [{required: true, message: 'Please select state/province/region'}],
  zip: [{required: true, message: 'Please enter zip code'}],
})

const visible = ref(false)
const paramsProps = ref<View.DefaultParams>({
  title: '',
  row: {},
  api: undefined,
  getTableList: undefined
})

const emit = defineEmits<{
  'add': [id: string]
}>()

// 接收父组件传过来的参数
const acceptParams = (params: View.DefaultParams) => {
  paramsProps.value = params
  if (!paramsProps.value.isAdd) getState()
  visible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      const { data } = await paramsProps.value.api!(paramsProps.value.row)
      ElMessage.success({message: `${paramsProps.value.title} Successfully！`})
      paramsProps.value.getTableList!()
      visible.value = false
      // 是添加地址的话，抛出事件给出新添加的地址ID
      if (paramsProps.value.isAdd) {
        emit('add', data)
      }
    } catch (error) {
      console.log(error)
    }
  })
}

// 获取国家数据
const countryOptions = ref<IMap.RegionOptions[]>([])
const getCountry = async () => {
  const { data } = await getCountryOptionApi()
  countryOptions.value = data
}

// 获取区域数据
const stateOptions = ref<IMap.RegionOptions[]>([])
const getState = async (reSelect: boolean = false) => {
  if (reSelect) {
    paramsProps.value.row.state = ''
    paramsProps.value.row.city = ''
    paramsProps.value.row.detail = ''
    paramsProps.value.row.zip = ''
  }
  const parentId = countryOptions.value.find((item) => item.name === paramsProps.value.row.country)?.id
  if (!parentId) return
  const { data } = await getStateOptionApi({ parentId })
  stateOptions.value = data
}

defineExpose({
  acceptParams
})
</script>

<style scoped lang="scss">

</style>