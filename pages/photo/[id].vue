<template>
  <section>
    <div class="container-middle">
      <div class="spu-wrapper acea-row nowrap gap-column-base md:pt-50 sm:pt-20">
        <div class="spu-preview acea-row nowrap row-column">
          <div class="py-15">
            <div class="acea-row row-center-wrapper nowrap gap-column-base">
              <SvgIcon name="anquan" class="text-50 text-gold" />
              <p class="text-26 font-500 text-gray-700">Your Privacy is Paramount.Images are securely deleted after 3 days.</p>
            </div>
          </div>
          <div class="flex-1 bg-gray-100 acea-row row-center-wrapper">
            <div class="preview-box aspect-square acea-row row-center-wrapper">
              <img :src="imagePrefix(productAlbum)" alt="" @click="imgViewVisible = true" v-if="productAlbum">
              <div class="text-center py-60" v-else>
                <SvgIcon name="empty" class="text-50" />
                <p class="text-20 font-bold mt-20">No Data</p>
                <p class="text-14 my-20">If you can't find the picture you requested, please check the image ID or try
                  again later.</p>
                <el-button size="large" type="primary" @click="_getProductAlbum">TRY AGAIN</el-button>
              </div>
            </div>
          </div>
          <div class="btn mt-15" @click="downloadImage">DOWNLOAD HIGH-RES DIGITAL ART</div>
        </div>
        <div class="spu-info acea-row row-column row-between">
         <div class="spu-text">
           <img class="" :src="imagePrefix('/static/artdafen/photo-title.webp')" alt="title">
         </div>
          <div class="flex-1">
            <img class="w-full h-full object-cover" :src="imagePrefix('/static/artdafen/photo-info.webp')" alt="info">
          </div>
          <div class="btn mt-15" @click="goProduct">ORDER YOUR CUSTOM OIL PAINTING</div>
        </div>
      </div>

      <div class="process-wrapper md:pt-40 pt-20">
        <img class="img" :src="imagePrefix('/static/artdafen/photo-process.webp')" alt="process">
      </div>
    </div>
  </section>

  <!--  图片查看器 -->
  <el-image-viewer
      v-if="imgViewVisible"
      :url-list="[imagePrefix(productAlbum)]"
      @close="imgViewVisible = false"
      hide-on-click-modal
  />

</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import {ElMessageBox, ElMessage} from "element-plus";
import {getProductAlbumApi} from "~/api/modules/product/product";

definePageMeta({
  notFold: true
})

onMounted(() => {
  if (route.params.id as string) {
    id.value = route.params.id as string
    _getProductAlbum()
  }
})

const { imagePrefix } = useImage()
const router = useRouter()
const route = useRoute()
const id = ref()
const imgViewVisible = ref(false)
const downloading = ref(false)

const downloadImage = async () => {
  if (downloading.value) return
  downloading.value = true

  const imageUrl = imagePrefix(productAlbum.value)

  try {
    const response = await fetch(imageUrl + '?t=' + Date.now(), {
      mode: 'cors'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const blob = await response.blob()

    const objectUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')

    // 自动解析文件名
    const filename =
        imageUrl.split('/').pop()?.split('?')[0] || 'image.webp'

    link.href = objectUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(objectUrl)

    // ✅ 下载成功弹窗
    ElMessageBox.alert(
        'The image has been saved to your device.',
        'Download Complete',
        {
          confirmButtonText: 'OK',
          type: 'success',
          showClose: false
        }
    )
  } catch (err: any) {
    ElMessage.error(
        err?.message || 'Download failed, please try again.'
    )
  } finally {
    downloading.value = false
  }
}

const productAlbum = ref('')
const _getProductAlbum = async () => {
  const {data} = await getProductAlbumApi(id.value)
  productAlbum.value = data
}

const goProduct = () => {
  router.push({
    path: `/paint-detail/${id.value}`
  })
}
</script>

<style scoped lang="scss">
  $linear-gradient: linear-gradient(135deg, #C89425 0%, #573D08 100%);

  .text-gold {
    background-image: $linear-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  
  .spu-wrapper {

    .spu-preview {
      width: 50%;

      .preview-box {
        img {
          max-width: 100%;
          max-height: 100%;
          cursor: zoom-in;
        }
      }
    }

    .spu-info {
      width: 50%;
    }

    .btn {
      width: 100%;
      height: clamp(35px, 3.64vw, 70px);
      line-height: clamp(35px, 3.64vw, 70px);
      text-align: center;
      border-radius: 6px;
      background: $linear-gradient;
      color: #fff;
      font-size: clamp(12px, 1.04vw, 20px);
      font-weight: bold;
      cursor: pointer;
    }
  }

  .process-wrapper {

    .img {
      max-width: 1200px;
      width: 100%;
      margin: auto;
    }
  }

  @media (max-width: 768px) {
    .spu-wrapper {
      flex-direction: column;

      .spu-preview {
        width: 100%;
      }

      .spu-info {
        width: 100%;
        margin-top: 15px;
      }

    }
  }
</style>



