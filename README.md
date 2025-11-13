# 🎨 ARTDAFEN 前端项目

> **项目名称**：ARTDAFEN  
> **开发公司**：雅今文化科技有限公司  
> **框架**：Nuxt.js 4 + TypeScript + Element Plus  
> **定位**：艺术品展示与电商平台前端系统

---

## 🚀 技术栈

| 分类        | 技术/库                                                                                                                       | 说明                   |
|-----------|----------------------------------------------------------------------------------------------------------------------------|----------------------|
| 前端框架      | [Nuxt.js 4](https://nuxt.com/)                                                                                             | 基于 Vue 3 的服务端渲染框架    |
| UI 框架     | [Element Plus](https://element-plus.org/)                                                                                  | Vue 3 版本的 Element UI |
| 状态管理      | [Pinia](https://pinia.vuejs.org/) + [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) | 状态管理及持久化存储           |
| 请求库       | [Axios](https://axios-http.com/)                                                                                           | 网络请求及拦截管理            |
| 国际化       | [i18n-jsautotranslate](https://translate.zvo.cn/)                                                                          | 支持自动翻译的国际化方案         |
| 加密        | [JSEncrypt](https://travistidwell.com/jsencrypt/)                                                                          | 前端 RSA 加密            |
| 图片预览      | [OpenSeadragon](https://openseadragon.github.io/)                                                                          | 高清图像缩放与预览            |
| 图片裁剪      | [Vue Advanced Cropper](https://advanced-cropper.github.io/vue-advanced-cropper/)                                           | 图像裁剪组件               |
| 轮播图       | [Swiper](https://swiperjs.com/)                                                                                            | 响应式滑块组件              |
| Cookie 提示 | [Vanilla Cookie Consent](https://cookieconsent.orestbida.com/)                                                             | Cookie 政策弹窗          |
| 事件总线      | [mitt](https://github.com/developit/mitt)                                                                                  | 跨组件事件通信（轻量级）         |
| 网站统计      | [Google Analytics 4 (GA4)](https://analytics.google.com/analytics/web/#)                                                   | 网站流量及行为分析            |
| 第三方登录     | [Google OAuth](https://developers.google.com/identity/protocols/oauth2?hl=zh-cn)                                           | Google 授权登录集成        |
| 数据压缩      | [fflate](https://github.com/101arrowz/fflate)                                                                              | 前端数据压缩库              |
| 邮件模板      | [MJML](https://mjml.io/)                                                                                                   | 邮件模板引擎               |
| GTM后台     | [Google Tag Manager](https://tagmanager.google.com/)                                                                         | 标签管理工具               |

---

## 📦 项目结构

```bash
├── api/                # API 接口（请求封装、数据处理）
├── assets/             # 静态资源（样式、图片等）
├── components/         # Vue 组件
├── composables/        # 组合式函数（逻辑复用）
├── config/             # 项目配置文件（环境变量、FAQ等）
├── constant/           # 常量配置
├── layouts/            # 页面布局文件
├── middleware/         # 中间件（路由守卫）
├── pages/              # 页面文件（自动路由）
├── plugins/            # 插件配置（axios、pinia 持久化、i18n、mitt、GA4、Google 登录等）
├── public/             # 公共静态资源（如 favicon、robots.txt、 谷歌登录、GA4文件 等）
├── regular/            # 正则表达式配置
├── store/              # Pinia 状态管理
├── types/              # 类型定义（接口、枚举等）
├── utils/              # 工具函数（加密、日期格式化等）
├── .env.development    # 开发环境配置（如 API 地址、GA4 ID 等）
├── .env.production     # 生产环境配置（如 API 地址、GA4 ID 等）
├── .gitignore          # Git 忽略文件（如 node_modules、.env 等）
├── app.vue             # 应用入口文件
├── env.d.ts            # 环境变量类型定义
├── error.vue           # 错误处理页面
├── nuxt.config.ts      # Nuxt 项目配置
├── package.json
└── tsconfig.json
```

---

## ⚙️ 安装与运行

### 1️⃣ 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2️⃣ 启动开发环境

```bash
npm run dev
```

### 3️⃣ 构建生产环境

```bash
npm run build
```

### 4️⃣ 启动生产环境

```bash
npm run start
```

### 5️⃣ 生成静态站点

```bash
npm run generate
```

### 6️⃣ 类型检测

```bash
npm run lint:types
```

---

## 🌍 国际化说明

本项目使用 **i18n-jsautotranslate** 作为多语言自动翻译核心，并配合自定义的 `useTranslateLang` 组合式函数，实现 *
*自动语言切换 + Element Plus 语言包联动**。

### 🔗 语言数据来源

项目支持的语言列表从以下接口动态获取：

> **接口地址：** [https://api.translate.zvo.cn/language.json](https://api.translate.zvo.cn/language.json)

在项目中，这些语言信息被映射为 `languageData`，包含 `id`（系统标识）、`name`（显示名称）、`serviceId`（翻译标识）等字段。

### ⚙️ 功能说明

`useTranslateLang` 封装了整个国际化逻辑，主要功能包括：

- **语言初始化**：在页面挂载时自动检测 `window.translate.language.getCurrent()`，同步当前语言；
- **语言切换代理**：劫持 `window.translate.changeLanguage()` 方法，实现语言切换时自动触发 Element Plus 语言更新；
- **Element Plus 国际化联动**：动态懒加载对应语言包（如 `en`, `fr`, `de`, `zh-TW` 等），并更新到全局状态；
- **降级策略**：若当前语言在 Element Plus 中未被支持（如 `is` 冰岛语），则自动降级使用默认语言（`en`）；
- **响应式支持**：`currentLang`、`currentElementPlusLocale` 均为响应式变量，可在组件中直接使用；
- **语言手动切换**：提供 `switchLanguage(lang: string)` 函数实现手动切换。

### 🧩 使用示例

在需要使用语言切换功能的组件中引入 `useTranslateLang` 组合式函数：

```vue

<script setup lang="ts">
  import {useTranslateLang} from '~/composables/useTranslateLang'

  const {currentLang, languageData, switchLanguage} = useTranslateLang()
</script>

<template>
  <div>
    <p>当前语言：{{ currentLang }}</p>
    <select @change="switchLanguage($event.target.value)">
      <option v-for="item in languageData" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
```

在 app.vue 或 nuxt.config.ts 中，可使用 currentElementPlusLocale 动态控制 Element Plus 的国际化：

```vue

<script setup lang="ts">
  import {useTranslateLang} from '~/composables/useTranslateLang'

  const {currentElementPlusLocale} = useTranslateLang();
</script>

<template>
  <el-config-provider :locale="currentElementPlusLocale">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </el-config-provider>
</template>
```

### 🈚 不支持语言的处理

如果选择的语言未在 `element-plus/es/locale/lang/` 中找到对应包（例如冰岛语 is），
则系统会自动使用默认的 英语语言包（en），确保界面始终可用。

### 📦 文件位置

* 国际化逻辑封装：`composables/useTranslateLang.ts`
* 语言包配置：`elementPlusLocaleMap`（内置懒加载映射）
* 外部接口数据源：https://api.translate.zvo.cn/language.json

### ✅ 优点总结

* 自动翻译支持（由 i18n-jsautotranslate 提供）
* Element Plus 组件国际化联动更新
* 支持 20+ 种欧洲语言
* 无需手动引入语言文件，自动懒加载
* 语言降级安全机制，避免国际化崩溃

---

## 🔐 安全与加密

* 使用 JSEncrypt 进行前端 RSA 加密；
* 适用于加密用户隐私信息（如登录凭证、表单数据等）；
* 公钥由后端提供，前端通过插件全局注册使用。

---

## 🧩 全局事件管理（mitt）

本项目使用 [mitt](https://github.com/developit/mitt) 作为轻量级全局事件总线，用于组件间通信。

事件总线在 `plugins/mitt.client.ts` 中注册，并通过 Nuxt 插件机制自动注入到全局上下文。

### 🔧 插件实现

```ts
// plugins/mitt.client.ts
import mitt from 'mitt'

export type MittEvents = {
    closeCartWindow: void
    openCartWindow: void
    loginSuccess: void
}

export default defineNuxtPlugin((_nuxtApp) => {
    const mittBus = mitt<MittEvents>()
    return {provide: {bus: mittBus}}
})
```

插件在客户端加载（`.client.ts` 后缀），自动挂载在 Nuxt 应用实例中,在任意组件中都可通过 useNuxtApp() 访问。

### 💡 使用示例

监听事件

```ts
const {$bus} = useNuxtApp()

$bus.on('closeCartWindow', () => {
    console.log('购物车窗口已关闭')
})
```

触发事件

```ts
$bus.emit('openCartWindow')
```

移除事件监听

```ts
$bus.off('closeCartWindow')
```

### 📘 事件列表

| 事件名称            | 描述                          |
|-----------------|-----------------------------|
| openCartWindow  | 打开购物车窗口                     |
| closeCartWindow | 关闭购物车窗口                     |
| loginSuccess    | 用户登录成功后触发（例如刷新用户状态、关闭登录弹窗等） |

---

## 📊 Google Tag Manager（GTM）统一埋点与广告追踪

> 本项目未直接引入 `gtag.js` 或 GA4 脚本，而是通过 Google Tag Manager (GTM) 作为统一容器，托管以下功能：

| 功能                            | 是否通过 GTM 管理 |
| ----------------------------- | ----------- |
| GA4（Google Analytics 4）数据统计   | ✅ 是         |
| Google Ads 转化追踪 & Remarketing | ✅ 是         |
| 自定义事件 (例如加入购物车、下单成功)          | ✅ 是         |
| DataLayer 数据推送                | ✅ 支持        |

> GTM 插件在 `plugins/gtm.client.ts` 中注册，仅在 生产环境 生效。

### 🔧 插件实现

```ts
// plugins/gtm.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    // 只在生产环境生效
    if (import.meta.env.MODE !== 'production') {
        console.log('[gtm] 当前非生产环境：', import.meta.env.MODE)
        return
    }

    if (!process.client) return

    if (!GTM_ID) {
        console.warn('[gtm] GTM Measurement ID is not provided.')
        return;
    }

    // 插入 <head>：gtm.js
    // 1. 将此代码粘贴到网页的 <head> 中尽可能靠上的位置：
    const script = document.createElement('script')
    script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `
    document.head.appendChild(script)

    // 插入 <body> 最前面：noscript iframe
    // 2. 请将此代码粘帖到紧跟起始 <body> 标记之后的位置：
    const noscript = document.createElement('noscript')
    noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `
    document.body.prepend(noscript)

    // 推送 page_view 事件给 GTM dataLayer
    nuxtApp.hook('page:finish', () => {
        const route = useRoute()
        window.dataLayer?.push({
            event: 'page_view',
            page_path: route.fullPath,
            page_title: document.title
        })
    })
})
```

### ⚙️ 配置方式

```ts
// .env
NUXT_PUBLIC_GTM_ID = G - XXXXXXXXXX
```
在非生产环境下（如 `development` 或 `staging`），不会加载或上报统计信息，以避免干扰数据。

### 如何触发页面浏览（page_view）事件？
```ts
nuxtApp.hook('page:finish', () => {
    const route = useRoute()
    window.dataLayer?.push({
        event: 'page_view',
        page_path: route.fullPath,
        page_title: document.title
    })
})
```
说明： 
* 在 GTM → 触发器 → 选择 “自定义事件”，监听 `page_view` 即可绑定 GA4 的 PageView。
* 不再手动调用 gtag('config', 'G-XXXX')。

### 发送自定义事件（例如加入购物车）
```ts
window.dataLayer?.push({
  event: 'add_to_cart',
  items: [{
    item_id: goods.id,
    item_name: goods.name,
    price: goods.price,
    quantity: 1
  }]
})
```

在 GTM 中设置：
* 触发器：自定义事件 → `add_to_cart`
* 标签：GA4 事件 → 参数映射 → 发送至 GA4 或 Google Ads

---

## 🔑 Google 授权登录（OAuth2）

本项目内置 Google 登录授权 功能，在 `plugins/google-auth.client.ts` 中注册，通过 `$google` 对象提供全局调用。

* 支持通过 Google OAuth 2.0 登录；
* 采用 Google Identity Services 集成；
* 用户可使用 Google 账号快速注册/登录；
* 需在 Google [Cloud Console](https://console.cloud.google.com/) 中配置：
    * OAuth Client ID；
    * 授权回调地址；
    * 作用域（email, profile 等）。

### 🔧 插件实现

```ts
// plugins/google-auth.client.ts
import {getUrlQuery} from '~/utils'

class AuthGoogle {
    // 自动授权逻辑
    oAuth() {
        const {code} = getUrlQuery()
        if (!code) return this.toAuth()
    }

    // 跳转到 Google 授权页面
    toAuth() {
        window.location.replace(this.getAuthUrl())
    }

    // 拼接授权 URL
    getAuthUrl() {
        const redirect_uri = 'https://artdafen.com/get-google-code.html'
        const scope = 'email profile'
        const client_id = 'xxxxxx'
        const access_type = 'offline'
        const response_type = 'code'
        const project_url = `${encodeURIComponent(location.origin + '/auth')}`

        // get-google-code.html 是自定义跳转回调文件（位于 public 目录）
        return `https://accounts.google.com/o/oauth2/auth?response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&client_id=${client_id}&access_type=${access_type}&state=${project_url}`
    }
}

export default defineNuxtPlugin(() => {
    const ga = new AuthGoogle()
    return {provide: {google: ga}}
})
```

### 🧭 授权跳转回调

`/public/get-google-code.html `是自定义的 Google 授权中转页：

它负责解析授权返回参数，并将 code 回传到业务地址。

```html
<!-- public/get-google-code.html -->
<script>
    var GGC = {
        urlParams: {},
        getUrlParams: function () {
            var pairs = location.search.substring(1).split('&')
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=')
                if (pos === -1) continue
                GGC.urlParams[pairs[i].substring(0, pos)] = decodeURIComponent(pairs[i].substring(pos + 1))
            }
        },
        appendParams: function (url, params) {
            if (params) {
                var baseWithSearch = url.split('#')[0]
                var hash = url.split('#')[1]
                for (var key in params) {
                    var attrValue = params[key]
                    if (attrValue !== undefined) {
                        var newParam = key + '=' + attrValue
                        baseWithSearch += baseWithSearch.indexOf('?') > 0 ? '&' + newParam : '?' + newParam
                    }
                }
                url = hash ? baseWithSearch + '#' + hash : baseWithSearch
            }
            return url
        },
        doRedirect: function () {
            var code = GGC.urlParams['code']
            var state = GGC.urlParams['state']
            if (code && state) {
                var targetUrl = GGC.appendParams(state, {
                    code: code,
                    state: encodeURIComponent(state)
                })
                location.href = targetUrl
            } else {
                document.body.innerHTML = '<h3>Missing necessary parameters, unable to complete the jump.</h3>'
            }
        }
    }
    GGC.getUrlParams()
    GGC.doRedirect()
</script>

```

### 💡 使用示例

在页面或组件中可直接调用全局的 `$google` 方法：

```ts
// 示例：点击按钮执行 Google 登录
const toGoogleAuth = () => {
    const {$google} = useNuxtApp()
    let path = route.fullPath
    if (path === LOGIN_URL) path = HOME_URL
    window.localStorage.setItem(STORAGE_BACK_URL, path)
    $google.oAuth()
}
```

* `$google.oAuth()` 方法会自动检查是否存在授权 `code`，若无则跳转至 Google 授权页面。
* 授权完成后会回调至 `/get-google-code.html`，再自动重定向回原业务页面。

---

## 🖼️ 图片相关功能

本项目包含两大图像相关模块：

1. OpenSeadragon —— 高清图片深度缩放预览
2. Vue Advanced Cropper —— 图片裁切与头像上传

### 🔍 OpenSeadragon 高清图预览

本项目使用 [OpenSeadragon](https://openseadragon.github.io/) 实现高清图片的多层级缩放预览，支持查看大型艺术作品或高清图片细节。

#### 🧩 核心原理

OpenSeadragon 并不能直接读取普通的 `.jpg`、`.png `图片，它需要使用 `.dzi`（Deep Zoom Image）格式文件。

`.dzi` 文件由 [libvips](https://www.libvips.org/) 工具生成，libvips 会将原始图片切割为多级金字塔结构的小块，以便在网页端进行流畅缩放浏览。

#### ⚙️ 安装与配置 libvips（Windows）

1. 前往 [libvips Releases](https://github.com/libvips/libvips/releases) 页面，下载最新版本的 `vips-dev-w64-web-x.y.z.zip`
   文件。
2. 解压至任意目录，例如：
   ```makefile
   E:\vips\vips-dev-8.17
   ```
3. 将以下路径加入系统环境变量：
   ```makefile
    E:\vips\vips-dev-8.17\bin
   ```
4. 打开命令提示符（CMD），输入以下命令以验证安装：
   ```bash
   vips --version
   ```
   若显示版本号，则安装成功。

#### 🏗️ 生成 DZI 文件

在终端中运行以下命令，将普通图片转换为可供 OpenSeadragon 使用的 `.dzi` 文件：

```bash
  vips dzsave artwork.jpg output-folder-name
```

说明：

| 参数                 | 说明                         |
|--------------------|----------------------------|
| artwork.jpg        | 原始高清图片文件                   |
| output-folder-name | 输出目录名（自动生成 `.dzi` 文件与切片目录） |

执行后会生成：

```bash
  output-folder-name.dzi        # DZI 描述文件
  output-folder-name_files/     # 图像切片目录
```

#### 💡 使用示例

```vue
<HighResViewer
  :thumbnail-src="imagePrefix(goodsDetail.img)"
  :dzi-url="imagePrefix(goodsDetail.dzi)"
/>
```

| 属性            | 类型     | 说明         |
|---------------|--------|------------|
| thumbnail-src | string | 缩略图 URL    |
| dzi-url       | string | DZI 文件 URL |

组件会自动加载并渲染高清预览视图，支持平移、缩放等操作。

### ✂️ Vue Advanced Cropper 图片裁切上传

项目使用 [vue-advanced-cropper](https://advanced-cropper.github.io/vue-advanced-cropper/)实现头像裁切功能，允许用户上传图片并进行自由缩放、拖拽、裁切。

该功能已封装为 `ImgCropper` 公共组件。

#### 💡 使用示例

```vue

<ImgCropper
  ref="imgCropperRef"
  :src="imageUrl"
  @cropper-success="cropperSuccess"
/>
```

| 属性               | 类型       | 说明                         |
|------------------|----------|----------------------------|
| src              | string   | 待裁切的图片 URL                 |
| @cropper-success | function | 裁切完成回调事件，可获取裁切后的 `File` 对象 |

#### 📁 裁切回调示例

```ts
/**
 * @description 裁切成功回调
 */
const cropperSuccess = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        await uploadAvatar(formData)
    }
```

* 该回调中可直接将裁切后的头像文件通过接口上传服务器。
* 组件内部封装了预览与交互逻辑，外部仅需处理上传。

---

## 🔄 持久化状态

使用 Pinia + pinia-plugin-persistedstate 管理用户状态：

* 登录信息、语言偏好等可持久保存；
* 页面刷新或重载后仍保持状态。

---

## 🧠 轮播图与 Cookie 管理

* 使用 Swiper 实现轮播广告与作品展示；
* 使用 Vanilla Cookie Consent 实现 Cookie 政策弹窗。

---

## 📁 环境变量示例

在根目录创建 `.env` 文件：

```bash
# 接口地址
NUXT_PUBLIC_API_BASE=https://api.example.com

# 默认语言
NUXT_PUBLIC_DEFAULT_LANG=zh-CN

# 加密公钥
NUXT_PUBLIC_RSA_PUBLIC_KEY=xxxxx
```

---

## 📧 邮件营销模板构建（MJML）

本项目支持通过 Google 邮件系统 进行邮件营销与推送通知。

为了确保邮件在不同设备与邮箱客户端中保持一致的布局与样式，项目使用 [MJML](https://mjml.io/) 来编写和生成 HTML 邮件模板。

### 🧩 实现流程

1. UI 设计阶段
    * 由设计师在 Figma 或其他设计工具中输出邮件视觉稿。
2. 前端开发阶段
    * 前端开发者根据设计稿，用 HTML + CSS 还原邮件布局。
    * 将 HTML 模板转换为 MJML 格式（可维护性更强，语义化结构更清晰）。
    * 示例：

```mjml
<mjml>
  <mj-body background-color="#fafafa">
    <mj-section>
      <mj-column>
        <mj-image width="200px" src="https://example.com/logo.png" />
        <mj-text font-size="18px" color="#333333" font-weight="bold">
          Welcome to Our Newsletter
        </mj-text>
        <mj-button background-color="#007BFF" color="white" href="https://your-site.com">
          View More
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

3. MJML 转换阶段
    * 访问 [MJML 在线转换工具](https://mjml.io/try-it-live)，将 MJML 模板粘贴至左侧输入框。
    * 转换后的 HTML 可直接用于 Google 邮件推送系统（如 Gmail、GA Campaign、或后端邮件服务）。

### 🧰 关键优势

| 优势         | 说明                             |
|------------|--------------------------------|
| 📱 响应式布局   | MJML 内置邮件端兼容性处理，自动适配 PC 与移动端   |
| 💡 模块化结构   | 支持可复用的 section、column 等组件      |
| 🧑‍💻 简化开发 | 远离传统邮件 HTML 的兼容性陷阱             |
| 📤 可直接发送   | 生成的 HTML 可直接用于 Google 邮件推送 API |

### 💡 开发建议

* 推荐使用 MJML 官方 CLI 工具进行本地编译：

```bash
npm install -g mjml
mjml input.mjml -o output.html
```

* 生成的 HTML 模板应在 Gmail、Outlook、Apple Mail 等常见客户端中测试显示效果。

---

## 🛍️ Google Search Central - 商品 JSON-LD 结构化数据

本项目遵循 [Google Search Central](https://developers.google.com/search?hl=zh-cn) 官方规范。

自动生成商品的 JSON-LD 结构化数据，提升 SEO 效果及购物搜索曝光度（Google Shopping）。

### 💡 功能说明

通过自定义的组合式函数 `useCustomProductJsonLd()` 、 `useOriginalProductJsonLd()` 、 `useProductJsonLd()` 来注入不同类型商品的
`JSON-LD` 结构化数据。

可动态生成符合 Schema.org 规范的商品数据结构（包含价格、库存、邮费、退货政策、评价等）。

数据在 服务端渲染（SSR）与客户端渲染（CSR） 均支持自动注入 `<head>` 中。

✅ 实现文件（版画商品 JSON-LD）：/composables/useCustomProductJsonLd.ts

✅ 实现文件（摆件商品 JSON-LD）：/composables/useProductJsonLd.ts

✅ 实现文件（原作商品 JSON-LD）：/composables/useOriginalProductJsonLd.ts

### ⚙️ 主要功能点

| 功能模块                                | 说明                                                    |
|-------------------------------------|-------------------------------------------------------|
| **商品信息**                            | 自动输出名称、描述、SKU、图片、价格、库存状态、链接等基本信息                      |
| **多国运费（ShippingDetails）**           | 支持全局邮费或“按国家分组”邮费策略（自动聚合相同费率）                          |
| **退货政策（ReturnPolicy）**              | 自动生成带 `merchantReturnDays`、`restockingFee` 等参数的退货策略对象 |
| **价格有效期（priceValidUntil）**          | 可设置价格有效期天数（默认 30 天）                                   |
| **评分与评论（AggregateRating / Review）** | 支持自动挂载汇总评分与用户评论                                       |
| **SSR 注入**                          | 使用 `useHead()` 将 JSON-LD 自动注入到 `<head>`，在 SEO 抓取时直接识别 |

### 🧩 使用方式

```ts
import {useCustomProductJsonLd} from '~/composables/useCustomProductJsonLd'

const goodsDetail = ref(productDetailData)

// 初始化 composable
const {injectProductJsonLd} = useCustomProductJsonLd(goodsDetail.value, {
    siteUrl: 'https://www.example.com',
    priceValidUntilDays: 60,     // 价格有效期
    shippingRateUSD: 12.99,      // 全局邮费（美元）
    restockingFee: 0.05,         // 退货上架费（5%）
    returnDays: 14,              // 可退货天数
})

// 注入 JSON-LD 到 <head>
injectProductJsonLd()
```

### 📦 JSON-LD 输出示例

```json
[
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Mona Lisa (La Gioconda)",
    "sku": "1911707886035632586",
    "image": "https://dafen-prod-media.artdafen.com/trade/pi/1911707886035632586/img.webp?x-image-process=image%2Fwatermark%2Ctext_QVJUREFGRU4uQ09N%2Csize_60%2Ccolor_FFFFFF%2Cshadow_50%2Cg_center%2Ctype_d3F5LXplbmhlaQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251009T094237Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AMXHODUN79OLZSIIGMAA%2F20251009%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=9449ac73bc18ed5c1b55c3b51b8e29d97af50e3ef53200ff85c9d75bdd60e7d3",
    "description": "Personalized custom painting with selectable size, frame, and material options. Price varies depending on customization.",
    "url": "https://artdafen.com/paint-detail/1911707886035632586",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "188.50",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": [
        {
          "@id": "#shipping_global_standard"
        }
      ],
      "hasMerchantReturnPolicy": {
        "@id": "#return_policy_global"
      },
      "priceValidUntil": "2025-11-08"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Size",
        "value": "Customizable sizes available"
      },
      {
        "@type": "PropertyValue",
        "name": "Frame",
        "value": "With frame or frameless options"
      },
      {
        "@type": "PropertyValue",
        "name": "Material",
        "value": "High-quality materials"
      }
    ]
  },
  {
    "@context": "https://schema.org/",
    "@type": "OfferShippingDetails",
    "@id": "#shipping_global_standard",
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": [
        "US",
        "CA",
        "MX",
        "GB",
        "IE",
        "DE",
        "FR",
        "IT",
        "ES",
        "NL",
        "SE",
        "NO",
        "DK",
        "FI",
        "PL",
        "AT",
        "BE",
        "CH",
        "PT",
        "AU",
        "NZ",
        "JP",
        "KR",
        "SG",
        "HK",
        "TW",
        "AE",
        "SA",
        "IL",
        "BR",
        "AR",
        "CL",
        "CO",
        "PE",
        "UY",
        "EC",
        "VE",
        "ZA",
        "NG",
        "EG",
        "MA",
        "KE",
        "GH",
        "TN",
        "DZ",
        "ET",
        "TZ"
      ]
    },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 3,
        "unitCode": "DAY"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 3,
        "maxValue": 12,
        "unitCode": "DAY"
      }
    }
  },
  {
    "@context": "https://schema.org/",
    "@type": "MerchantReturnPolicy",
    "@id": "#return_policy_global",
    "applicableCountry": [
      "US",
      "CA",
      "MX",
      "GB",
      "IE",
      "DE",
      "FR",
      "IT",
      "ES",
      "NL",
      "SE",
      "NO",
      "DK",
      "FI",
      "PL",
      "AT",
      "BE",
      "CH",
      "PT",
      "AU",
      "NZ",
      "JP",
      "KR",
      "SG",
      "HK",
      "TW",
      "AE",
      "SA",
      "IL",
      "BR",
      "AR",
      "CL",
      "CO",
      "PE",
      "UY",
      "EC",
      "VE",
      "ZA",
      "NG",
      "EG",
      "MA",
      "KE",
      "GH",
      "TN",
      "DZ",
      "ET",
      "TZ"
    ],
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 14,
    "returnMethod": "https://schema.org/ReturnByMail",
    "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility",
    "restockingFee": 0.05
  }
]
```

### 🧠 关键参数说明

| 参数名                     | 类型                                         | 默认值                                 | 说明                  |
|-------------------------|--------------------------------------------|-------------------------------------|---------------------|
| `siteUrl`               | `string`                                   | 从 `runtimeConfig.public.siteUrl` 读取 | 当前网站基础 URL，用于生成商品链接 |
| `countryCodes`          | `string[]`                                 | 内置欧美主要国家                            | 目标销售国家              |
| `handlingDays`          | `{min: number, max: number}`               | `{min:1, max:3}`                    | 备货时间范围（天）           |
| `transitDays`           | `{min: number, max: number}`               | `{min:3, max:12}`                   | 运输时间范围（天）           |
| `shippingRateUSD`       | `number`                                   | -                                   | 全局邮费（美元）            |
| `shippingRateByCountry` | `Record<string, number>`                   | -                                   | 按国家配置邮费，自动聚合相同费率    |
| `returnDays`            | `number`                                   | `14`                                | 退货有效期（天）            |
| `restockingFee`         | `number`                                   | `0.05`                              | 上架费（5%）             |
| `priceValidUntilDays`   | `number`                                   | `30`                                | 价格有效期（天），0 表示不输出    |
| `aggregateRating`       | `{ratingValue:number, reviewCount:number}` | -                                   | 汇总评分                |
| `reviews`               | `Review[]`                                 | -                                   | 最近评价数据              |

### 🔍 验证工具

生成的 JSON-LD 可通过以下官方工具进行验证：

* [Google Rich Results Test](https://search.google.com/test/rich-results)
* [Schema.org Structured Data Testing Tool](https://validator.schema.org/)

---

## 🗜️ 查询参数压缩与短路径优化

本项目使用 [fflate](https://101arrowz.github.io/fflate/) 库对 URL 查询参数进行压缩与解压，实现了“短路径参数（Token）”功能，有效缩短
URL 长度，避免复杂对象参数暴露。

### 📍 应用场景

1.产品搜索页参数压缩

* 原始参数示例：

```bash
    ?MENU_ID=xxxx
    &TECHNIQUE={parentId:xxx,id:xxx}
    &CHECKBOX=[{parentId:xxx,id:xxx}]
    &ARTIST={id:xxx,name:xxx}
```

* 压缩后参数示例：

```bash
    ?q=eyJjIjpbMTAxLDIwMl0sImQiOltbMTAzLDIwNV1dLCJnIjpbMTAyLDIwMywiUGljYXNzbyJdfQ
```

通过调用 `packQuery()` 将复杂对象序列压缩为 短 Token 字符串，URL 更简洁。

2. 摆件商品参数压缩

* 原始参数：

```bash
?q=[{name:'size',val:'large'},{name:'color',val:'red'}]
```

* 压缩后参数：

```bash
?q=H4sIAAAAA...
```

### 🧩 组合式函数实现

压缩逻辑封装于一个组合式工具文件中（`useQueryShort.ts`），核心依赖 `fflate`：

```ts
import {deflateSync, inflateSync, strFromU8, strToU8} from 'fflate'

export type QueryParams = {
    MENU_ID?: string
    TECHNIQUE?: string
    CHECKBOX?: string
    ARTIST?: string
    // ...
}

// 压缩查询参数
export function packQuery(obj: Record<string, any>): string {
    const withShortKeys = shrinkKeys(obj)
    const valueCompacted = shrinkValuesDeep(withShortKeys)
    const jsonMin = JSON.stringify(valueCompacted)
    const u8 = strToU8(jsonMin)
    const compressed = deflateSync(u8, {level: 9})
    return b64urlFromBytes(compressed)
}

// 解压查询参数
export function unpackQuery<T = any>(token?: string | null): T | null {
    if (!token) return null
    try {
        const bytes = bytesFromB64url(token)
        const u8 = inflateSync(bytes)
        const json = strFromU8(u8)
        const restored = restoreKeys(JSON.parse(json))
        return restored as T
    } catch {
        return null
    }
}
```

### 🧠 核心逻辑说明

| 模块函数                                  | 功能说明                                  |
|---------------------------------------|---------------------------------------|
| `shrinkKeys`                          | 将原始对象键名映射为短字符（如 `MENU_ID → a`）        |
| `shrinkValuesDeep`                    | 将对象/数组结构转换为元组数组，减少层级冗余                |
| `packQuery`                           | 对压缩结果进行 deflate 压缩并转为 URL-safe Base64 |
| `unpackQuery`                         | 逆向解析 Token，恢复原始对象结构                   |
| `b64urlFromBytes` / `bytesFromB64url` | 保证 Token 在 URL 中的安全传输                 |

### ✅ 优势

* URL 极度精简：适合 SEO、分享、记录搜索条件
* 安全性提升：避免明文参数暴露业务结构
* 通用性强：可用于任意对象参数压缩传递
* 零依赖后端解码：纯前端完成编码与解码

---

## 🚪 路由权限说明

本项目的路由权限逻辑集中在中间件文件：

```bash
  /middleware/auth.global.ts
```

该文件主要负责以下三项核心功能：

1. 在 SSR 阶段自动恢复 Token 与 Currency 标识
2. 对需要登录权限的页面进行访问校验与跳转拦截
3. 防止已登录用户重复访问登录或注册页面

### 🔧 权限逻辑说明

1. SSR 阶段恢复登录状态与货币标识

在 Nuxt 服务端渲染（SSR）阶段，会从 Cookie 中读取用户的登录凭证与货币标识：

* auth_token：用户登录的 Token
* currency_code：当前货币代码

并将其写入到 Pinia 的全局状态中，防止页面刷新或 SSR 渲染时丢失状态。

```ts
if (import.meta.server) {
    const token = getCookie(useRequestEvent()!, 'auth_token')
    const currency: string = getCookie(useRequestEvent()!, 'currency_code')
    if (token && !userStore.token) userStore.setToken(token)
    if (currency) currencyStore.setCurrentCurrency(currency)
}
```

2. 已登录用户访问登录 / 注册页自动重定向

当用户已登录时，若尝试访问 `/login` 或 `/register` 页面，系统将自动跳转至首页（`HOME_URL`），避免重复登录操作。

```ts
if (userStore.isLogin && (path === loginPath || path === registerPath)) {
    if (path !== homePath) return navigateTo(HOME_URL, {replace: true})
}
```

3. 页面登录权限控制（基于 definePageMeta）

在页面文件中可通过 `definePageMeta` 来声明页面是否需要登录权限：

```ts
definePageMeta({
    auth: true
})
```

当 `auth` 为 `true` 时：
* 若用户未登录，将自动跳转至登录页；
* 客户端会自动保存当前页面路径至 `localStorage` 中（键名为 `STORAGE_BACK_URL`），登录成功后可自动回跳。

```ts
if (needAuth && !userStore.isLogin) {
  if (import.meta.client) localStorage.setItem(STORAGE_BACK_URL, to.fullPath)
  if (path !== loginPath) return navigateTo(LOGIN_URL, { redirectCode: 302 })
}
```

### 📘 使用规范总结

| 功能描述          | 实现方式                             |
| ------------- | -------------------------------- |
| SSR 恢复登录状态与货币 | 自动从 Cookie 中获取并注入 Pinia          |
| 已登录访问登录/注册页   | 自动重定向至首页                         |
| 需要登录的页面校验     | `definePageMeta({ auth: true })` |
| 回跳地址记录        | 登录前自动保存至 `localStorage`          |

---

## 👨‍💻 Author

开发与维护： 雅今文化科技有限公司 · 前端开发团队

项目名称： ARTDAFEN

负责人： Cho

联系方式：

* 📧 邮箱：`ruolincho@gmail.com`
* 💬 QQ：`2380402636`
* 💬 微信：`2380402636`

如需技术支持或项目对接，请通过以上任一方式联系本项目的前端开发负责人。

---

## 📜 License

本项目 ARTDAFEN 为 雅今文化科技有限公司 内部专用前端项目，所有源代码、设计资源及文档均为公司资产。

* 本项目的全部内容仅供雅今文化科技有限公司内部开发、测试与部署使用；
* 未经公司书面授权，禁止任何个人或组织以任何形式复制、传播、修改、出售或公开发布本项目的部分或全部内容；
* 本项目不适用于任何开源协议（如 MIT、Apache、GPL 等）；
* 项目中涉及的第三方库和依赖项的版权归其原作者所有，使用时请遵守相应的开源许可；
* 雅今文化科技有限公司保留对本项目内容的最终解释权及所有法律权益。

版权声明：© 2025 雅今文化科技有限公司. All rights reserved.

本项目仅限雅今文化科技有限公司内部使用，严禁外传或商用。
