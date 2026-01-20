<template>
  <section>
    <div class="container">
      <h1 class="text-40 f-bold-500 py-lg-50 py-30">Frequently Asked Questions</h1>
      <div class="fq-container acea-row row-between row-top">
        <div class="fq-left">
          <el-collapse v-model="activeName" accordion>
            <div
              v-for="(item, index) in faqList"
              :key="item.category"
              :ref="(el) => sectionRefs[index] = el as HTMLElement"
            >
              <div class="text-center my-20 f-bold-500">{{ item.headTitle }}</div>
              <el-collapse-item
                  v-for="subItem in item.list"
                  :title="subItem.title"
                  :name="subItem.slug"
                  :key="subItem.slug"
              >
                <template #icon="{ isActive }">
                  <p style="margin-left: auto">
                    <span class="iconfont text-20 ml-10" :class="isActive ? 'icon-reduce' : 'icon-add'"></span>
                  </p>
                </template>
                <div class="px-20 py-24" v-html="subItem.content"></div>
              </el-collapse-item>
            </div>
          </el-collapse>
        </div>
        <div class="fq-right shadow-lg p-xl-20 p-15">
          <p class="text-18 f-bold-500 ">Couldn't find what you need? Contact Support.</p>
          <p class="text-14 text-gray-600 mt-12 mb-24">
            We typically reply within 5 business days.
          </p>
          <el-form :model="messageForm" :rules="rules" size="large" ref="ruleFormRef">
            <el-form-item prop="email">
              <el-input v-model="messageForm.email" placeholder="Email address"/>
            </el-form-item>
            <el-form-item prop="subject">
              <el-select v-model="messageForm.subject" placeholder="Subject" clearable>
                <el-option
                  v-for="subject in faqList"
                  :key="subject.headTitle"
                  :label="subject.headTitle"
                  :value="subject.headTitle"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="message">
              <el-input v-model="messageForm.message" type="textarea" :rows="4" placeholder="Message"/>
            </el-form-item>
            <el-button class="" type="primary" @click="handleSend">
              SEND MESSAGE
              <span class="iconfont icon-right-arrow ml-8 text-16"></span>
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">
import {type ElForm, ElMessage} from "element-plus";
import {faqList, generateFAQPageJsonLd} from "~/config/faq";
import {sendConsulting} from "~/api/modules/message/message";
import {emailReg} from "~/regular";
import {resolvePageMeta, mergeHeadWithLodash} from "~/config/pageMeta";

defineOptions({
  name: 'Faq',
})

onMounted(() => {
  // 只有在客户端且 params 存在时才执行
  const {category, slug} = route.params
  if (category && slug) {
    // 这里加一个小延时是为了对抗浏览器的“滚动恢复”机制
    setTimeout(() => {
      scrollToSection();
    }, 100);
  }
})

const route = useRoute()

const origin = useRequestURL().origin
useHead(mergeHeadWithLodash(
  resolvePageMeta("/faq"),
  {
    link: [
      {rel: 'canonical', href: `${origin}/faq`},
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(generateFAQPageJsonLd(faqList))
      }
    ]
  }
))

const messageForm = ref( {
  email: '',
  subject: '',
  message: '',
})

const rules = reactive({
  email: [
    {required: true, message: 'Please enter your email'},
    {message: 'Please enter the correct email address', pattern: emailReg},
  ],
  subject: [{required: true, message: 'Please select your subject'}],
  message: [{required: true, message: 'Please enter your message'}],
})

const sectionRefs = ref<HTMLElement[]>([]);

const activeName = ref('')

const scrollToSection = async () => {

  const {category, slug} = route.params

  if (!slug || !category) return;

  // 等待 DOM 更新
  await nextTick();

  // 找到分类对应的索引
  const sectionIndex = faqList.findIndex(item => item.category === category);

  // 防御性检查：索引无效直接退出
  if (sectionIndex === -1) return;

  // 获取 DOM 元素的逻辑封装，支持简单的重试
  const findDomAndScroll = (retryCount = 0) => {
    const dom = sectionRefs.value[sectionIndex];

    if (dom) {
      // 找到了 DOM，执行滚动
      dom.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // 延迟展开面板，配合滚动动画
      setTimeout(() => {
        activeName.value = slug;
      }, 500);
    } else {
      // 没找到 DOM，且重试次数小于 5 次（约 250ms），则重试
      // 这解决了首次加载时 ref 还没填充完的问题
      if (retryCount < 5) {
        setTimeout(() => findDomAndScroll(retryCount + 1), 50);
      }
    }
  };

  findDomAndScroll();
}

const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const handleSend = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    await sendConsulting(messageForm.value)
    ElMessage.success('Message sent successfully')
    ruleFormRef.value!.resetFields()
  });
}

watch(() => route.fullPath, (newVal: string) => {
  if (newVal) {
    scrollToSection();
  }
})

</script>

<style scoped lang="scss">
.fq-container {
  position: relative;

  .fq-left {
    width: 62.89%;
  }

  .fq-right {
    width: 27.89%;
    position: sticky;
    top: 150px;
  }

}

@media (max-width: 991px) {
  .fq-container {
    .fq-left {
      width: 100%;
    }

    .fq-right {
      width: 100%;
      margin-top: 15px;
      position: static;
    }
  }
}
</style>