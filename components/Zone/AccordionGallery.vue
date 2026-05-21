<template>
  <div class="accordion-container">
    <div
        v-for="(item, index) in list"
        :key="item.id"
        class="accordion-item"
        :class="{ active: activeIndex === index }"
        @mouseenter="activeIndex = index"
        @click="activeIndex = index"
    >
      <img :src="imagePrefix(item.banners[0] || item.img)" :alt="item.title" class="bg-image"/>
      <NuxtLink class="content-overlay" :to="`/zone-detail/${item.id}/${item.slug}`">
        <div class="text-box">
          <h2 class="title truncate">{{ item.title }}</h2>
          <p class="subtitle truncate">{{ item.name }}</p>
        </div>
        <div class="link-box acea-row row-center-wrapper">
          <SvgIcon name="link" class="text-20" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import type {IProduct} from "~/api/interface/product/product";

// 定义 Props
interface Props {
  list: IProduct.ZoneRow[];
}

const props = defineProps<Props>()
const { imagePrefix } = useImage()
const activeIndex = ref(0)
</script>

<style lang="scss" scoped>
  .accordion-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 500px;
    gap: 16px;
    box-sizing: border-box;

    @media (max-width: 768px) {
      flex-direction: column;
      height: 70vh;
    }

    .accordion-item {
      position: relative;
      flex: 1;
      border-radius: 24px;
      overflow: hidden;
      transition: flex 0.6s cubic-bezier(0.25, 1, 0.5, 1);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

      &.active {
        flex: 5;

        .content-overlay {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
          pointer-events: auto;
        }
      }

      .bg-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .content-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 30px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
        color: white;
        opacity: 0;
        transform: translateY(100%);
        pointer-events: none;
        transition: opacity 0.4s ease, transform 0.4s ease;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .text-box {
          flex: 1;
          overflow: hidden;

        }

        .title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 500;

          @media (max-width: 768px) {
            font-size: 1.2rem;
          }
        }

        .subtitle {
          margin: 5px 0 0 0;
          font-size: 1rem;
          opacity: 0.8;

          @media (max-width: 768px) {
            font-size: 0.9rem;
          }
        }

        .link-box {
          width: 40px;
          height: 40px;
          background: #fff;
          border-radius: 50%;
          color: #000;
        }

        @media (max-width: 768px) {
          padding: 20px;

          .link-box {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
</style>