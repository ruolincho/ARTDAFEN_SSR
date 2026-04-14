<template>
  <template v-if="activityData !== null">
    <div class="discount-wrapper shadow-md" v-if="isOpen">
      <div class="discount-container">
        <div class="discount-form">

          <template v-if="userStore.userInfo.subscribe === '1'">
            <!--<div class="form-logo-box">-->
            <!--  <img class="form-logo" src="~/assets/images/logo2.png" alt="">-->
            <!--</div>-->

            <div class="form-title-box">
              <h2 class="form-title text-26 f-bold text-center">
                " {{ activityData.title }} Up To {{ activityData.maxDiscount }}% Off "
              </h2>
            </div>
            <div class="form-time-box">
              <Countdown :end-time="activityData.endTime" @finish="handleDiscountEnd" />
            </div>
            <div class="form-line-box">
              <div class="form-line"></div>
            </div>
            <div class="form-text-box text-center">
              <p class="text-14">Get Up To {{ activityData.maxDiscount }}% OFF Your Order</p>
              <p class="text-14">Sign Up Now!</p>
            </div>
            <div class="form-field-box">
              <div class="border-b-md border-b-dotted">
                <el-form :model="messageForm" :rules="rules" size="large" ref="ruleFormRef" :disabled="isFinish">
                  <el-form-item prop="email">
                    <el-input v-model="messageForm.email" placeholder="Enter Your Email" size="large"/>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="form-text-box text-center">
              <p class="text-12">*Just Add to Cart — Up To {{ activityData.maxDiscount }}% OFF Instantly</p>
            </div>
            <div class="form-button-box">
              <el-button size="large" type="danger" round class="w-full" @click="handleSend" :disabled="isFinish">Save More Money</el-button>
            </div>
          </template>

          <template v-else>
            <div class="form-tips-box text-center">
              <p class="text-50 f-bold text-error">SUCCESS!</p>
              <p class="text-24 f-bold" style="line-height: 150%">
                Automatically Get {{ activityData.maxDiscount }}% OFF Sitewide at Checkout
              </p>
            </div>
          </template>

        </div>
        <img class="discount-image" :src="imagePrefix(activityData.img)" alt="poster">
        <div class="discount-close-button cursor-pointer" @click="handleClose">
          <span class="iconfont icon-error-fill"></span>
        </div>
      </div>
    </div>

    <div class="discount-rectangle-teaser" v-else @click="handleOpen">
      <button>Get {{ activityData.maxDiscount || 0 }}% Off</button>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { type ElForm } from "element-plus";
import { emailReg } from "~/regular";
import {ACTIVITY_WINDOW_CLOSED} from "~/config";
import {useUserStore} from "~/stores/modules/user";
import {subscribe} from "~/api/modules/message/message";
import Countdown from "~/components/Countdown.vue";
import type {IActivity} from "~/api/interface/activity/activity";
import {getActivityApi} from "~/api/modules/activity/activity";
import {useImage} from "~/composables/useImage";
import {useAppStore} from "~/stores/modules/app";

const { imagePrefix } = useImage()
const userStore = useUserStore()
const appStore = useAppStore()
const isOpen = ref(false);

// 抽离出一个初始化方法
const initVisibility = () => {
  if (!appStore.isPc) return;
  // 安全检查：如果代码意外在服务端运行，直接返回，防止报错
  if (typeof window === 'undefined' || !localStorage) return;

  const hasClosedBefore = localStorage.getItem(ACTIVITY_WINDOW_CLOSED);
  setTimeout(() => {
    isOpen.value = hasClosedBefore !== 'true';
  }, 5000)
}

const activityData = ref<IActivity.ActivityRow | null>(null)
const _getActivity = async () => {
  const {data} = await getActivityApi()
  activityData.value = data
}

onMounted(() => {
  _getActivity()
});

watch(() => activityData.value, (newData) => {
  if (newData) {
    initVisibility();
  }
});

const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const messageForm = ref({ email: '' });
const rules = reactive({
  email: [
    {required: true, message: 'Please enter your email'},
    {message: 'Please enter the correct email address', pattern: emailReg},
  ],
});

// 点击悬浮窗 -> 展开
const handleOpen = () => {
  isOpen.value = true;
}

// 点击关闭 -> 隐藏并记录到 localStorage
const handleClose = () => {
  isOpen.value = false;
  // 确保在客户端才执行 setItem (虽然 click 事件肯定在客户端，但为了严谨习惯)
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACTIVITY_WINDOW_CLOSED, 'true');
  }
}

const handleSend = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    await subscribe(messageForm.value)
    userStore.updateSubscribe('0')
  });
}

const isFinish = ref(false)
const handleDiscountEnd = () => {
  isFinish.value = true
}
</script>

<style scoped lang="scss">
  .discount-wrapper {
    position: fixed;
    z-index: 121;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 680px;
    max-height: 100%;
    min-height: 300px;
    display: flex;
    transform: translate(100%, -50%);
    animation: slide-in-x-50-y-50 1s forwards;

    .discount-container {
      position: relative;
      display: flex;
      width: 100%;

      .discount-form {
        z-index: 1;
        width: 50%;
        background: var(--color-gray-100);
        padding: 30px 20px;
        display: flex;
        flex-direction: column;

        .form-logo-box {
          padding: 55px 12px 6px 12px;

          .form-logo {
            width: 184px;
            margin: auto;
          }
        }

        .form-time-box {
          padding: 20px 0 5px 2px;
          text-align: center;
        }

        .form-title-box {
          .form-title {
            color: var(--color-error) !important;
            line-height: 125% !important;
            word-break: break-word;
            font-family: MontserratOmnisend, Verdana, sans‐serif, serif !important;
          }

        }

        .form-line-box {
          padding: 6px 12px;

          .form-line {
            border-top: 2px dotted #D7D7D7;
          }
        }

        .form-text-box {
          color: #383838;
          font-family: Verdana, sans-serif;
          line-height: 150%;
          word-break: break-word;
          padding: 10px 12px 5px;
        }

        .form-field-box {
          padding: 10px 12px 5px;
        }

        .form-button-box {
          padding: 15px 30px 5px;
        }

        .form-tips-box {
          padding: 10px 12px 5px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

      }

      .discount-image {
        width: 50%;
        will-change: transform;
        object-fit: cover;
        background-color: #F9F8F8;
      }

      .discount-close-button {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 2;
        color: #fff;

        .iconfont {
          font-size: 22px;
        }
      }
    }

  }

  .discount-rectangle-teaser {
    position: fixed;
    z-index: 121;
    background-color: var(--color-primary);
    padding: 9px 14px 12px;
    max-width: 400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    cursor: pointer;
    transform-origin: bottom right;
    top: auto;
    bottom: 50%;
    right: 0;
    transform: rotate(-90deg) translateX(50%);
    margin-right: clamp(1.82vw, 12px, 32px);

    button {
      color: #E7DAC3;
      font-family: Verdana, sans-serif;
      font-size: 16px;
      font-weight: normal;
      text-decoration: none;
      font-style: normal;
      background-color: transparent;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    .discount-wrapper {
      padding: 0 12px;

      .discount-container {

        .discount-form {
          width: 100%;
          flex: 1;
        }

        .discount-image {
          display: none;
        }

        .discount-close-button {
          color: var(--color-primary);

          .iconfont {
            font-size: 20px;
          }
        }
      }
    }
  }

  @keyframes slide-in-x-50-y-50 {
    100% {
      transform: translate(-50%, -50%);
    }
  }
</style>