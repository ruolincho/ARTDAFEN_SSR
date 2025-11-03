<template>
  <section>
    <div class="container">
      <h1 class="text-40 f-bold-500 py-lg-50 py-30">Frequently Asked Questions</h1>
      <div class="fq-container acea-row row-between row-top">
        <div class="fq-left">
          <el-collapse v-model="activeName" accordion>
            <div
              v-for="(item, index) in faqList"
              :key="index"
              :ref="(el) => sectionRefs[index] = el as HTMLElement"
            >
              <div class="text-center my-20 f-bold-500">{{ item.headTitle }}</div>
              <el-collapse-item v-for="subItem in item.list" :title="subItem.title" :name="subItem.name"
                                :key="subItem.name">
                <template #icon="{ isActive }">
                  <p style="margin-left:  auto">
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
import {faqList} from "~/config/faq";
import {sendConsulting} from "~/api/modules/message/message";
import {emailReg} from "~/regular";
import {pageMeta} from "~/config/pageMeta";

const route = useRoute()

const origin = useRequestURL().origin
useHead({
  link: [
    {rel: 'canonical', href: `${origin}/faq`},
  ],
  ...pageMeta[route.path] ?? pageMeta["/faq"]
});

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

const scrollToSection = async (name: string) => {
  // 先滚动到目标位置（由于渲染延迟，这里需要两次nextTick）
  await nextTick();
  await nextTick();
  const sectionIndex = faqList.findIndex(item => item.name === name.split('-')[0]);

  if (sectionIndex > -1 && sectionRefs.value[sectionIndex]) {
    sectionRefs.value[sectionIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // 滚动完成后再展开面板
    await new Promise(resolve => setTimeout(resolve, 500)); // 等待滚动动画完成
    activeName.value = name;
  }
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

watch(() => route.query.name, (newVal) => {
  if (newVal) {
    scrollToSection(newVal as string);
  }
}, {
  immediate: true
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