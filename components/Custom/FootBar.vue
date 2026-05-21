<template>
  <!--:style="{ position: currentView === 'custom' ? 'relative' : 'sticky' }"-->
  <div
      class="foot-wrapper py-20"
      :class="{ 'has-continue': hasContinue }"
  >
    <div class="container">
      <div class="foot-inner">
        <div class="back-btn acea-row row-middle cursor-pointer" @click="handleBack">
          <SvgIcon name="left" class="text-20" />
          <span class="text-20 font-bold">Back</span>
        </div>
        <div class="foot-center">
          <div class="foot-text text-20 font-bold text-center truncate">Physically Hand-painted by Artists (Zero Printing)
          </div>
          <el-button
              class="foot-btn" type="primary" size="large"
              @click="handleContinue"
              v-if="hasContinue"
          >
            Continue
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// 定义 Props
interface Props {
  hasContinue: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasContinue: false
})

const emit = defineEmits(['back', 'continue'])

const handleBack = () => {
  emit('back')
}

const handleContinue = () => {
  emit('continue')
}

</script>

<style scoped lang="scss">
  .foot-wrapper {
    position: sticky;
    z-index: 22;
    bottom: 0;
    left: 0;
    background: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
    margin-bottom: -30px;

    .foot-inner {
      position: relative;

      .back-btn {
        position: absolute;
        left: 0;
        top: 0;
      }

      .foot-center {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .foot-text {
          padding: 0 60px;
          max-width: 600px;
        }
      }
    }

    &.has-continue {
      .foot-inner {

        .back-btn {
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }


  }

  @media (max-width: 991px) {
    .foot-wrapper {
      margin-bottom: -15px;
    }
  }

  @media (max-width: 768px) {
    .foot-wrapper {

      .foot-inner {
        .foot-center {
          flex-direction: column;
          row-gap: 20px;

          .foot-text {
            padding: 0 30px;
            order: 2;
          }

          .foot-btn {
            order: 1;
          }
        }
      }

      &.has-continue {
        .foot-inner {
          .back-btn {
            top: 11px;
            transform: unset;
          }
        }
      }
    }
  }

  @media (max-width: 414px) {
    .foot-wrapper .foot-inner .foot-center .foot-text {
      max-width: 270px;
      padding: 0 20px;
    }
  }
</style>