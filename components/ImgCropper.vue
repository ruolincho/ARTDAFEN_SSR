<template>
  <el-dialog
    v-model="visible"
    title="Image cropper"
    :destroy-on-close="true"
    width="490px"
  >
    <Cropper
      class="cropper"
      v-bind="$attrs"
      ref="cropperRef"
      :src="src"
      :stencil-props="{ aspectRatio: 1 }"
      :auto-zoom="true"
    />
    <template #footer>
      <el-button @click="visible = false" size="large">Cancel</el-button>
      <el-button type="primary" @click="handleSubmit" size="large">Submit</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

interface CropperProps {
  src: string
}

withDefaults(defineProps<CropperProps>(), {
  src: ''
})

const emit = defineEmits<{
  'cropperSuccess': [file: File];
}>()

const cropperRef = ref<InstanceType<typeof Cropper>>()
const visible = ref(false)

const handleSubmit = () => {
  const {coordinates, image, visibleArea, canvas} = cropperRef.value?.getResult()
  if (canvas) {
    canvas.toBlob((blob: Blob) => {
      if (blob) {
        const file = new File([blob], 'avatar.png', { type: blob.type || 'image/png' })
        emit('cropperSuccess', file)
        visible.value = false
      }
    }, 'image/png')
  }
}

const open = () => {
  visible.value = true
}

defineExpose({
  open
})

</script>

<style scoped lang="scss">
.cropper {
  min-height: 300px;
}
</style>