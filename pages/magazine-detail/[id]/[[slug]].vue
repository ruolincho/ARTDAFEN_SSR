<template>
  <section class="news-detail">
    <div class="container-small">

      <h1 class="text-40 f-bold my-20"> {{ newsDetail.title }}</h1>

      <div class="my-20 acea-row row-between-wrapper">
        <span class="text-16">{{ formatTimestamp(newsDetail.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        <el-popover
            :placement="appStore.isPc ? 'bottom' : 'left'"
            trigger="click"
            width="200"
            :popper-style="{ paddingBottom: 0 }"
            @hide="isClipboard = false"
        >
          <template #reference>
            <el-button round plain>
              <SvgIcon name="share" class="mr-10" />
              Share
            </el-button>
          </template>
          <div class="share-wrapper">
            <p class="share-title text-12 f-bold">SHARE MAGAZINE</p>
            <div class="share-list">
              <a
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="item.href"
                  class="share-item acea-row row-middle py-10 border-gray-200 border-b-sm"
                  v-for="item in share"
                  :key="item.name"
              >
                <SvgIcon :name="item.icon" />
                <span class="ml-12">{{ item.name }}</span>
              </a>
              <span
                  class="share-item acea-row row-middle py-10 border-gray-200 cursor-pointer"
                  @click="handleCopy"
              >
                <SvgIcon name="link" />
                <span class="ml-12">{{ isClipboard ? 'Link Copied!' : 'Copy Link ' }}</span>
                <SvgIcon name="check" class="ml-6" v-show="isClipboard" />
              </span>
            </div>
          </div>
        </el-popover>
      </div>

      <div class="rich-content" v-html="newsDetail.content"/>
    </div>
  </section>

  <!-- 推荐新闻 -->
  <section class="news-more" v-if="newsDetail.id">
    <div class="container-small">
      <h1 class="my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 f-bold">RECOMMEND</h1>
      <ClientOnly>
        <ProInfinite
          ref="proInfiniteRef"
          :request-api="getNewsRecommend"
          :init-param="initParam"
        >
          <template #default="scope">
            <div class="news-more-list">
              <NuxtLink class="news-more-item acea-row row-between gap-row-base" :to="`/magazine-detail/${item.id}/${item.slug}`" v-for="item in scope.rows" :key="item.id">
                <div class="p-cont">
                  <div>
                    <p class="text-26 line2">{{ item.title }}</p>
                    <p class="text-16 my-10 line2">{{ item.subtitle }}</p>
                  </div>
                  <div class="acea-row row-between-wrapper gap-xs">
                    <div class="acea-row row-middle gap-xs flex-1">
                      <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
                    </div>
                    <span class="text-14">{{ formatTimestamp(item.createTime, 'YYYY.MM.DD') }}</span>
                  </div>
                </div>
                <div class="p-img overflow-hidden">
                  <img class="w-full h-full fit-cover img-hover aspect-ratio-16_9" :src="imagePrefix(item.img)" :alt="item.title">
                </div>
              </NuxtLink>
            </div>
          </template>
        </ProInfinite>
      </ClientOnly>
    </div>
  </section>

</template>

<script setup lang="ts">
import {getNewsRecommendApi} from "~/api/modules/news/news";
import {formatTimestamp} from "~/utils/format";
import type {INews} from "~/api/interface/news/news";
import {copyToClipboard} from "~/utils";
import ProInfinite from "~/components/ProInfinite.vue";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {useAppStore} from "~/stores/modules/app";
import {useImage} from "~/composables/useImage";

defineOptions({
  name: 'NewsDetail',
})

const { imagePrefix } = useImage()
const appStore = useAppStore()
const origin = useRequestURL().origin
const route = useRoute()
const id = toRef(route.params, 'id') // 响应式拿 id
const canonicalUrl = `${origin}${route.path}`

// 新闻详情
const { data: newsDetail, pending, error, refresh } = await useAsyncData(() => `news-detail-${id.value}`, async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<INews.Row>>(config.public.apiBase + TRADE_MODULE + '/news/detail/' + id.value)
  return data
}, {
  server: true,
  default: () => ({} as INews.Row),
  // 当 id 变化时，自动重新执行（客户端）
  watch: [id],
})

const pageDescription = computed(() => {
  const { description } = newsDetail.value
  if (!description) return ''
  return description.length > 155 ? `${description.substring(0, 155).replace(/\n/g, ' ')}...` : description;
})

useHead({
  title: `${newsDetail.value.title} | ARTDAFEN Magazine`,
  meta: [
    {
      name: "description",
      content: pageDescription.value
    },
    {
      name: "keywords",
      content: newsDetail.value.keywords
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: newsDetail.value.title },
    { property: 'og:description', content: pageDescription.value },
    { property: 'og:image', content: imagePrefix(newsDetail.value.img) },
    { property: 'og:url', content: canonicalUrl },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: newsDetail.value.title },
    { name: 'twitter:description', content: pageDescription.value },
    { name: 'twitter:image', content: `${imagePrefix(newsDetail.value.img)}` }
  ],
  // 规范链接（防止重复内容影响权重）
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ]
})

function createShareLink(platform: 'pinterest' | 'x' | 'reddit' | 'email', media?: string) {
  const url = encodeURIComponent(canonicalUrl)
  const title = encodeURIComponent(newsDetail.value?.title || '')
  const description = encodeURIComponent(newsDetail.value?.description || '')
  const subject = encodeURIComponent('ARTDAFEN')

  switch(platform) {
    case 'pinterest':
      return `//pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${media}`
    case 'x':
      return `//x.com/intent/post?text=${title}&url=${url}`
    case 'reddit':
      return `//www.reddit.com/submit?url=${url}&title=${title}`
    case 'email':
      return `mailto:?subject=${subject}&body=${url}`
  }
}

const share = computed(() => [
  { name: 'Email', icon: 'email', href: createShareLink('email') },
  { name: 'Pinterest', icon: 'pinterest', href: createShareLink('pinterest', imagePrefix(newsDetail.value?.img || '')) },
  { name: 'X', icon: 'tuite', href: createShareLink('x') },
  { name: 'Reddit', icon: 'reddit', href: createShareLink('reddit') },
])

const isClipboard = ref(false)
const handleCopy = async () => {
  if (isClipboard.value) return
  await copyToClipboard(canonicalUrl)
  isClipboard.value = true
}

// 更多新闻
const initParam = reactive({id: '', categoryId: '', size: 5});
const getNewsRecommend = (params: INews.RecQuery) => getNewsRecommendApi(params)


// 在文件顶部，利用 Vite 提供的方法一次性加载所有本地 SVG 的源码文本
// eager: true 意味着在构建时就直接把这些文件内容塞进来，不会产生异步请求
// query: '?raw' 告诉 Vite 不要把它们当成模块处理，而是直接当成纯字符串返回
const svgRawModules = import.meta.glob('~/assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

// getIconStr 方法
const getIconStr = (name: string, className = '') => {
  // 从加载的模块中匹配对应文件名的 svg
  const targetPath = Object.keys(svgRawModules).find(path => path.endsWith(`/${name}.svg`));
  const rawSvg = targetPath ? svgRawModules[targetPath] : '';

  if (!rawSvg) {
    console.warn(`HTML 拼接错误: 找不到 SVG 文件 assets/icons/${name}.svg`);
    return ''; // 如果没找到图标，返回空字符串防止报错
  }

  // 核心魔法：将原始 <svg> 标签进行字符串替换，注入我们需要的样式和类名
  // 并顺手把源文件自带的硬编码 fill 替换成 currentColor
  return rawSvg
      .replace(
          /<svg\s/,
          `<svg class="svg-icon ${className}" aria-hidden="true" style="width:1em; height:1em; fill:currentColor; vertical-align:-0.15em;" `
      )
      .replace(/fill="[^none][^"]*"/g, 'fill="currentColor"')
      .replace(/stroke="[^none][^"]*"/g, 'stroke="currentColor"');
};

watch(() => newsDetail.value, (newVal: INews.Row) => {
  if (newVal && newVal.content) {
    // 针对 <img src> 和 <video src>
    newVal.content = newVal.content.replace(/(<(img|video)[^>]*src=")(?!http)([^"]+")/gi, (match, p1, p2, p3) => {
      // 注意：这里的 p3 包含了结尾的引号，所以 imagePrefix 最好只处理路径，或者确保 p3 格式正确
      return `${p1}${imagePrefix(p3)}`;
    });

    /*
    * 针对 style="background-image: url(...)" 或 css class
    * 正则解析：
    * url\(\s* -> 匹配 url( 和可能的空格
    * (&quot;|['"]?)  -> 第1组：匹配开始引号（包括转义的双引号 &quot;、单引号、双引号，或者没有引号）
    * (?!http|data:)  -> 排除 http 开头(已带域名) 和 data: 开头(base64)
    * (.*?)           -> 第2组：非贪婪匹配路径内容
    * \1              -> 匹配与第1组相同的结束引号
    * \s*\)           -> 匹配可能的空格和右括号
    * */
    newVal.content = newVal.content.replace(/url\(\s*(&quot;|['"]?)(?!http|data:)(.*?)\1\s*\)/gi, (match, quote, path) => {
      // quote: 捕获到的引号 (例如 &quot; 或 ' 或 空字符串)
      // path: 图片路径 (例如 /trade/ni/398.../bg_1.gif)

      // 重新组装：url( + 引号 + 处理后的路径 + 引号)
      return `url(${quote}${imagePrefix(path)}${quote})`;
    });

    if (newVal.original) {
      newVal.content = newVal.content.replace(
          /<img\b([^>]*?)src="([^"]+)"([^>]*)>/gi,
          (match, before, src, after) => {
            // 1. 如果已经包裹过，直接返回
            if (/img-wrapper/.test(match)) return match;

            let extractedWidth = '';

            // 2. 定义处理函数：从 style 中提取 width 并将其移除
            const processAttributes = (attrStr: string) => {
              // 匹配 style="xxx"
              return attrStr.replace(/style="([^"]*)"/gi, (styleMatch, styleContent) => {
                // 匹配 width: xxx; (忽略大小写和空格)
                const widthRegex = /width\s*:\s*([^;"]+)(;?)/i;
                const matchWidth = styleContent.match(widthRegex);

                if (matchWidth) {
                  extractedWidth = matchWidth[1].trim(); // 拿到宽度值 (e.g. "30%" 或 "300px")

                  // 从原 style 字符串中剔除 width 属性
                  let newStyleContent = styleContent.replace(widthRegex, '').trim();

                  // 如果剔除后 style 内容为空（或只剩分号），则直接移除整个 style 属性，保持 HTML 干净
                  if (!newStyleContent || newStyleContent === ';') {
                    return '';
                  }
                  return `style="${newStyleContent}"`;
                }
                return styleMatch;
              });
            };

            // 3. 处理 src 前后的属性 (alt, title, style 等)
            const newBefore = processAttributes(before);
            const newAfter = processAttributes(after);

            // 4. 组装 wrapper 的 style
            // 只有当提取到了宽度时，才给 wrapper 加内联 style，其他样式全靠 CSS 类名控制
            const wrapperStyle = extractedWidth ? ` style="width: ${extractedWidth};"` : '';

            return `
              <span style="text-align: center; display: block;">
                <span class="img-wrapper"${wrapperStyle}>
                  <img ${newBefore} src="${src}" ${newAfter}>
                  <a href="${createShareLink('pinterest', src)}" target="_blank" rel="noopener noreferrer" class="img-badge">
                    ${getIconStr('pinterest')}
                  </a>
                </span>
              </span>
          `;
          }
      );
    }

    initParam.id = newVal.id;
    initParam.categoryId = newVal.categoryId;
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
:deep(.rich-content) {
  font-size: 16px;
  line-height: 1.8;
  color: #333;

  // 段落
  p {
    margin: 1em 0;
  }

  // 标题
  h1 {
    font-size: 32px;
    line-height: 1.4;
    margin: 0.67em 0;
    font-weight: bold;
  }
  h2 {
    font-size: 26px;
    line-height: 1.4;
    margin: 0.75em 0;
    font-weight: bold;
  }
  h3 {
    font-size: 20px;
    line-height: 1.4;
    margin: 0.83em 0;
    font-weight: bold;
  }
  h4 {
    font-size: 18px;
    line-height: 1.4;
    margin: 0.83em 0;
    font-weight: bold;
  }

  // 列表
  ul {
    list-style: disc;
    margin: 1em 0;
    padding-left: 1.5em;

    ul {
      list-style: circle;
      padding-left: 1.5em;

      ul {
        list-style: square;
        padding-left: 1.5em;
      }
    }
  }

  ol {
    list-style: decimal;
    margin: 1em 0;
    padding-left: 1.5em;
  }

  li {
    margin: 0.5em 0;
    list-style: unset;
  }

  // 图片
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  // 引用
  blockquote {
    margin: 1em 0;
    padding-left: 1em;
    border-left: 4px solid #ddd;
    color: #666;
    font-style: italic;
    background: #f9f9f9;
  }

  // 表格
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    overflow-x: auto;
    display: block;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
    }
  }

  // 链接
  a {
  }

  // 强调文字
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }

  // 代码块
  pre {
    background: #f5f5f5;
    padding: 10px;
    overflow-x: auto;
  }
  code {
    background: #f5f5f5;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
  }

  // 分隔线
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 1em 0;
  }
}

.news-more {
  .news-more-list {
    .news-more-item {

      .p-cont {
        width: 68%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .p-img {
        flex-shrink: 0;
        width: 30%;
      }
    }

    .news-more-item + .news-more-item {
      margin-top: var(--gutter-base);
      padding-top: var(--gutter-base);
      border-top: var(--border-width-sm) solid var(--color-gray-200);
    }
  }
}

:deep(.img-wrapper){
  position: relative;
  display: inline-block;
  max-width: 100%;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .img-badge {
    position: absolute;
    right: 6px;
    bottom: 6px;
    background: var(--color-primary);
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    width: 33px;
    height: 33px;
    line-height: 33px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    // 使用 !important 覆盖 JS 生成的内联 style="width: 30%"
    width: 100% !important;

    // 变成块级元素，让图片独占一行
    display: block !important;
  }
}

@media (max-width: 768px) {
  .news-more {
    .news-more-list {
      .news-more-item {

        .p-cont {
          order: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

        }

        .p-img {
          order: 1;
          flex-shrink: 0;
          width: 100%;
        }
      }
    }
  }
}
</style>