<template>
  <div class="container">
    <h1 class="text-40 f-bold-500 py-50">MY PAGE</h1>
    <div class="account-container acea-row row-between row-top">
      <div class="account-panel shadow-lg">
        <div class="account-info acea-row row-middle p-20 border-b-sm border-gray-200">
          <el-upload
            class="mr-16"
            :accept="fileType.join(',')"
            :before-upload="beforeUpload"
            :on-change="uploadChange"
            :auto-upload="false"
            :show-file-list="false"
          >
            <div class="account-avatar">
              <img
                class="w-full h-full fit-cover rounded-full"
                :src="userStore.userInfo.avatar"
                alt="avatar"
                v-show="userStore.userInfo.avatar"
              >
              <div class="camera acea-row row-center-wrapper">
                <span class="iconfont icon-camera-switching"/>
              </div>
            </div>
          </el-upload>
          <div class="flex-1 overflow-hidden">
            <p class="text-14">Hello 👋 </p>
            <p class="text-18 f-bold mt-5 line1">{{ userStore.userInfo.nickname }} </p>
          </div>
        </div>
        <div class="account-menu my-lg-20 my-15">
          <div
            class="account-item acea-row nowrap row-middle py-15 px-20 cursor-pointer"
            :class="{ 'on': currentRoute === menu.path }"
            @click="router.replace(menu.path)"
            v-for="menu in menuList"
            :key="menu.path"
          >
            <span :class="`iconfont ${menu.icon} text-24`"></span>
            <span class="text-16 ml-12">{{ menu.name }}</span>
          </div>
          <div class="account-item acea-row row-middle py-16 px-20 cursor-pointer" @click="logout">
            <span class="iconfont icon-money-wallet text-24"></span>
            <span class="text-16 ml-12">Log Out</span>
          </div>
        </div>
      </div>
      <div class="account-page flex-1">
        <NuxtPage/>
      </div>
    </div>
  </div>
  <ClientOnly>
    <ImgCropper ref="imgCropperRef" :src="imageUrl" @cropper-success="cropperSuccess"/>
  </ClientOnly>
</template>

<script setup lang="ts">
import {useUserStore} from "~/stores/modules/user";
import {useAuth} from "~/composables/useAuth";
import {useHandleData} from "~/composables/useHandleData";
import ImgCropper from '~/components/ImgCropper.vue'
import type {UploadFile, UploadProps} from "element-plus";
import {ElMessage} from "element-plus";
import {uploadAvatar} from "~/api/modules/mine/mine";

defineOptions({
  name: 'Account'
})

const {logoutFn} = useAuth();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const logout = () => {
  useHandleData(
    logoutFn,
    {},
    'Are you sure to log out?'
  )
}

const menuList = [
  {name: 'Personal Information', icon: 'icon-customer', path: '/account/profile'},
  {name: 'My Orders', icon: 'icon-goods', path: '/account/orders'},
  {name: 'My Wishlists', icon: 'icon-follow', path: '/account/favorites'},
  {name: 'Manage Addresses', icon: 'icon-location', path: '/account/addresses'},
  // {name: 'Saved Cards', icon: 'icon-money-wallet', path: '/account/payments'},
]

const currentRoute = computed(() => route.path);

// 允许上传的文件类型
const fileType = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg']
const fileSize = 15
const imageUrl = ref('')
const imgCropperRef = ref<InstanceType<typeof ImgCropper>>()

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload: UploadProps['beforeUpload'] = rawFile => {
  const imgSize = rawFile.size / 1024 / 1024 < fileSize;
  const imgType = fileType.includes(rawFile.type);
  if (!imgType) ElMessage.warning('The uploaded image does not conform to the required format!');
  if (!imgSize) ElMessage.warning(`The size of the uploaded image cannot exceed ${fileSize}MB！`);
  return imgType && imgSize;
};

/**
 * @description 监听图片上传
 * */
const uploadChange = (file: UploadFile) => {
  imageUrl.value = URL.createObjectURL(file.raw as Blob); // 把 File 转成 临时路径
  imgCropperRef.value?.open()
}

/**
 * @description 裁切成功回调
 * */
const cropperSuccess = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file)
  await uploadAvatar(formData)
  await userStore.getUserEcho()
}

</script>

<style scoped lang="scss">
.account-container {

  .account-panel {
    width: 262px;
    margin-right: 30px;

    .account-info {
      .account-avatar {
        width: 51px;
        height: 51px;
        position: relative;

        .camera {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(0,0,0, 0.6);
          color: #fff;
          transition: all 0.3s ease-in-out;
          opacity: 0;
        }

        &:hover {
          .camera {
            opacity: 1;
          }
        }
      }
    }

    .account-menu {
      .account-item.on {
        background: var(--color-primary);
        color: #ffffff;
      }
    }

  }

  .account-page {

  }
}


@media (max-width: 1259px) {
  .account-container .account-panel {
    margin-right: 15px;
  }
}

@media (max-width: 991px) {
  .account-container {
    .account-panel {
      width: 100%;
      margin-bottom: 15px;
      margin-right: 0;
    }
  }
}
</style>