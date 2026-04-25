<template>
  <ul class="search-list">
    <li class="search-item" v-for="item in list" :key="item.id">
      <NuxtLink
          class="search-link"
          :to="generatedPath(item)"
          external
      >
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {COLLECTIONS_URL} from "~/config";
import type {IHome} from "~/api/interface/home/home";

interface Props {
  list: IHome.MenuRow[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => ([]) as IHome.MenuRow[],
});

const generatedPath = (item: IHome.MenuRow): string => {
  const q = packQuery({MENU_ID: item.id, PAGE: 1})
  return `${COLLECTIONS_URL}/${item.slug}?q=${q}`
}

</script>

<style scoped lang="scss">
  .search-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .search-item {
      .search-link {
        text-decoration: none;
        color: #222;
        font-size: 1rem;
        transition: color 0.2s;

        &:hover {
          color: #888;
        }
      }
    }
    .search-item + .search-item {
      margin-top: 18px;
    }
  }
</style>