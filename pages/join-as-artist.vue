<template>
  <section class="sec-banner">
    <div class="banner-wrapper">
      <img class="cursor-pointer" :src="imagePrefix('/static/artdafen/collaboration-banner.webp')" alt="banner">
    </div>
  </section>

  <section class="sec-global py-lg-80 py-40">
    <div class="container">
      <div class="section-header text-center">
        <div class="text-16 py-10 px-16 border-sm border-gray-700 inline-block" v-aos="'fade-up'">Global Art Collaboration</div>
        <h1 class="text-50 f-bold-500 mt-30" v-aos="'fade-up'">CREATING BEYOND BORDERS</h1>
      </div>
      <p class="intro text-22 mt-30" v-aos="'fade-up'">
        At Art Dafen, we believe that great art is born from connection. By collaborating with
        artists from around the world, we bring together diverse ideas, cultures, and styles to create something truly
        meaningful. Whether you’re an emerging voice or an established name, partnering with us means joining a platform
        that values originality, supports creative growth, and helps your work reach a wider, global audience.
      </p>
    </div>
  </section>

  <section class="sec-benefits py-lg-80 py-40">
    <div class="container">
      <div class="section-header text-center text-left-md">
        <div class="text-16 py-10 px-16 border-sm border-gray-700 inline-block" v-aos="'fade-up'">Benefits</div>
        <h1 class="text-50 f-bold-500 mt-30" v-aos="'fade-up'">PARTNERING WITH ARTDAFEN</h1>
      </div>
      <div class="row benefits-list mt-30">
        <div class="col-xs-6 col-12" v-aos="{ name: 'fade-up', delay: 0}">
          <div class="benefits-item bg-gray-200">
            <img class="icon" src="~/assets/images/collaboration-icon1.png" alt="icon">
            <div class="content">
              <h2 class="text-24 f-bold-500">Global Reach</h2>
              <p class="text-22 text-gray-600 ">Showcase your work through exhibitions, digital platforms, and global
                partnerships.</p>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-12" v-aos="{ name: 'fade-up', delay: 100}">
          <div class="benefits-item bg-gray-200">
            <img class="icon" src="~/assets/images/collaboration-icon2.png" alt="icon">
            <div class="content">
              <h2 class="text-24 f-bold-500">Cultural Exchange</h2>
              <p class="text-22 text-gray-600 ">Collaborate with artists and designers from around the world to inspire
                fresh ideas.</p>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-12" v-aos="{ name: 'fade-up', delay: 200}">
          <div class="benefits-item bg-gray-200">
            <img class="icon" src="~/assets/images/collaboration-icon3.png" alt="icon">
            <div class="content">
              <h2 class="text-24 f-bold-500">Creative Support</h2>
              <p class="text-22 text-gray-600 ">Access resources and a dedicated team that values both creativity and
                quality.</p>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-12" v-aos="{ name: 'fade-up', delay: 300}">
          <div class="benefits-item bg-gray-200">
            <img class="icon" src="~/assets/images/collaboration-icon4.png" alt="icon">
            <div class="content">
              <h2 class="text-24 f-bold-500">Sustainable Growth</h2>
              <p class="text-22 text-gray-600 ">Transform your art into lifestyle products that expand your audience and
                income.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-looking py-lg-80 py-40 bg-gray-200">
    <div class="container">
      <div class="looking-wrapper">
        <div class="left-block border-sm border-gray-700 text-50 f-bold-500 acea-row row-center-wrapper text-center" v-aos="'fade-right'">
          WHO WE’RE <br/> LOOKING FOR
        </div>
        <div class="right-block text-22 border-sm border-gray-700" v-aos="'fade-left'">
          <div class="content">
            <p class="mb-15">
              We welcome artists from all creative backgrounds — whether your practice is in painting, sculpture,
              illustration, or mixed techniques.
            </p>
            <p>
              We're seeking creators who:
            </p>
            <ul class="list-ul disc">
              <li>Have a clear artistic voice and produce original, authentic work</li>
              <li>Uphold high standards of quality, creativity, and cultural relevance</li>
              <li>Believe in bringing art into everyday life in meaningful ways</li>
              <li>Are open to international collaboration and expanding their reach</li>
            </ul>
            <p class="mt-15">
              Whether you're emerging or established, if your vision resonates with ours, we’d love to hear from you.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-process py-lg-80 py-40">
    <div class="container">
      <div class="section-header text-center">
        <div class="text-16 py-10 px-16 border-sm border-gray-700 inline-block" v-aos="'fade-up'">How to Apply</div>
        <h1 class="text-50 f-bold-500 mt-30" v-aos="'fade-up'">APPLICATION PROCESS</h1>
      </div>
      <div class="row process-list">
        <div class="col-12 col-xs-6 col-md-3" v-aos="{ name: 'fade-up', delay: 0}">
          <div data-eq="1" class="process-item bg-gray-200 rounded-lg text-center">
            <p class="text-24 f-bold-500 mb-lg-38 mb-15">Prepare Your Portfolio</p>
            <p class="text-22 text-gray-600 break-word">
              Select 5–10 recent works with titles, short descriptions, and any relevant links. Add a brief bio
              highlighting your artistic path.
            </p>
          </div>
        </div>
        <div class="col-12 col-xs-6 col-md-3" v-aos="{ name: 'fade-up', delay: 100}">
          <div data-eq="2" class="process-item bg-gray-200 rounded-lg text-center">
            <p class="text-24 f-bold-500 mb-lg-38 mb-15">Submit Your Application</p>
            <p class="text-22 text-gray-600 break-word">
              Email your portfolio and bio to us at <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>. Be sure to include your full name and contact
              details.
            </p>
          </div>
        </div>
        <div class="col-12 col-xs-6 col-md-3" v-aos="{ name: 'fade-up', delay: 200}">
          <div data-eq="3" class="process-item bg-gray-200 rounded-lg text-center">
            <p class="text-24 f-bold-500 mb-lg-38 mb-15">Review & Response</p>
            <p class="text-22 text-gray-600 break-word">
              Our curatorial team will assess your submission. You’ll receive a response within 14 business days if
              selected.
            </p>
          </div>
        </div>
        <div class="col-12 col-xs-6 col-md-3" v-aos="{ name: 'fade-up', delay: 300}">
          <div data-eq="4" class="process-item bg-gray-200 rounded-lg text-center">
            <p class="text-24 f-bold-500 mb-lg-38 mb-15">Begin the Collaboration</p>
            <p class="text-22 text-gray-600 break-word">
              Once approved, you’ll become part of our artist network and explore new opportunities with us.
            </p>
          </div>
        </div>
      </div>
      <div class="text-center" v-aos="'fade-up'">
        <el-button type="primary" size="large">
          SUBMIT NOW
        </el-button>
      </div>
    </div>
  </section>

  <section class="sec-form py-lg-80 py-40 bg-gray-600">
    <div class="container">
      <div class="form-wrapper">
        <div class="form-left text-white" v-aos="'fade-right'">
          <div class="section-header">
            <div class="text-16 py-10 px-16 border-sm border-white inline-block">Get In Touch</div>
            <h1 class="text-50 f-bold-500 mt-30">COLLABORATION INQUIRIES</h1>
          </div>
          <p class="text-28 text-gray-300 mt-28 mb-55" style="max-width: 509px;">
            Have questions about the collaboration or need help with your application? We’re here to support you.
          </p>
          <p class="text-22 f-bold-500">
            Reach us at: {{ CONTACT_EMAIL }}<br/>
            Or use the form to send us a message.
          </p>
          <p class="text-28 f-bold-600 pt-25 mt-25 border-t-sm border-white">Let’s create something meaningful
            together.</p>
        </div>
        <div class="form-right bg-white p-xl-35 p-25" v-aos="'fade-left'">
          <p class="text-30 f-bold-600">Send a Message</p>
          <p class="text-18 text-gray-600 mt-10 mb-30">
            We typically respond within 3–5 business days.
          </p>
          <el-form :model="messageForm" :rules="rules" size="large" ref="ruleFormRef">
            <el-form-item prop="email">
              <el-input v-model="messageForm.email" placeholder="Email address"/>
            </el-form-item>
            <el-form-item prop="subject">
              <el-input v-model="messageForm.subject" placeholder="Subject"/>
            </el-form-item>
            <el-form-item prop="message">
              <el-input v-model="messageForm.message" type="textarea" :rows="4" placeholder="Message"/>
            </el-form-item>
            <el-button class="float-right" type="primary" size="large" @click="handleSend">Submit</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">
import {type ElForm, ElMessage} from "element-plus";
import {CONTACT_EMAIL} from "~/config";
import {emailReg} from "~/regular";
import {sendConsulting} from "~/api/modules/message/message";
import {useImage} from "~/composables/useImage";
import {resolvePageMeta} from "~/config/pageMeta";

useHead(resolvePageMeta("/join-as-artist"));

const { imagePrefix } = useImage()
const messageForm = ref({
  email: '',
  subject: '',
  message: '',
})

const rules = reactive({
  email: [
    {required: true, message: 'Please enter your email'},
    {message: 'Please enter the correct email address', pattern: emailReg},
  ],
  subject: [{required: true, message: 'Please enter your subject'}],
  message: [{required: true, message: 'Please enter your message'}],
})

const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const handleSend = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    await sendConsulting(messageForm.value)
    ElMessage.success('Message sent successfully')
    ruleFormRef.value!.resetFields()
  });
}
</script>

<style scoped lang="scss">
.list-ul {
  padding-left: 5px; /* 视情况添加 */
  &.disc li {
    list-style-type: disc !important;
  }

  &.decimal li {
    list-style-type: decimal !important;
  }

  li {
    list-style-position: inside !important; /* 或 inside，根据你设计需求 */
  }
}

.sec-global {
  .intro {
    max-width: 1107px;
    margin: 0 auto;
  }
}

.sec-benefits {
  .benefits-list {
    --gutter: var(--gutter-md);
    row-gap: var(--gutter-md);

    .benefits-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      height: 100%;

      .icon {
        margin-right: 34px;
        width: clamp(3.94vw, 84px, 50px);
      }

      .content {
        max-width: 433px;
      }
    }

  }
}

.sec-looking {
  .looking-wrapper {
    display: flex;
    gap: 30px;

    .left-block {
      flex: 0 0 33.5%;
    }

    .right-block {
      flex: 1;
      padding: 3.72vw;

      .content {
        max-width: 750px;
        margin: auto;
      }
    }
  }
}

.sec-process {
  .process-list {
    margin: clamp(4.89vw, 50px, 94px) 0 clamp(3.54vw, 30px, 68px);
    row-gap: var(--gutter-base);

    .process-item {
      position: relative;
      padding: 4.89vw 2.60vw 2.13vw;
      height: 100%;

      p {
        position: relative;
        z-index: 3;
      }

      &::after {
        display: block;
        content: attr(data-eq);
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 0;
        transform: translateX(-50%) translateY(-50%);
        width: clamp(3.90vw, 55px, 75px);
        height: clamp(3.90vw, 55px, 75px);
        line-height: clamp(3.90vw, 55px, 75px);
        border-radius: 15px;
        background-color: var(--color-gray-400);
        color: #fff;
        font-size: clamp(1.87vw, 20px, 36px);
        font-weight: bold;
        text-align: center;
      }
    }
  }
}

.sec-form {
  .form-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 30px;

    .form-left {
      width: 43.02%;
    }

    .form-right {
      width: 30.59%;
      min-width: 350px;
      border-radius: 40px;
    }
  }
}

@media (max-width: 991px) {
  .sec-benefits .benefits-list {
    --gutter: var(--gutter-base);
    row-gap: var(--gutter-base);
  }

  .sec-looking .looking-wrapper {
    flex-direction: column;

    .left-block {
      flex: 0 0 100%;
      padding: 20px;
    }

    .right-block {
      padding: 20px;
    }
  }

  .sec-process .process-list {

    .process-item {
      padding: 30px;

      &::after {
        width: unset;
        height: unset;
        line-height: unset;
        background: transparent;
        color: rgba(0,0,0, 0.1);
        font-size: 100px;
        top: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
}

@media (max-width: 768px) {
  .sec-benefits .benefits-list .benefits-item{
    flex-direction: column;
    padding: 25px;

    .icon {
      margin-right: 0;
      margin-bottom: 15px;
    }

    .content {
      text-align: center;
    }
  }

  .sec-form {
    margin-bottom: -20px;

    .form-wrapper {
      flex-direction: column;

      .form-left {
        width: 100%;
      }

      .form-right {
        width: 100%;
        min-width: unset;
        border-radius: 10px;
      }
    }
  }
}
</style>