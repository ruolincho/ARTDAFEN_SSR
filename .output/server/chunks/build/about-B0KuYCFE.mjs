import { _ as _export_sfc, ab as imagePrefix, ac as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, ref, resolveDirective, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'consola';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import '@ctrl/tinycolor';
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const bannerImage = imagePrefix("/static/artdafen/about-banner.webp");
    ref([
      {
        id: 1,
        img: imagePrefix("/static/artdafen/about-partner1.webp"),
        title: "President of the French Fine Arts Association, R\xE9mi Ayrong"
      },
      {
        id: 2,
        img: imagePrefix("/static/artdafen/about-partner2.webp"),
        title: "Russian artist Tatyana Livova"
      },
      {
        id: 3,
        img: imagePrefix("/static/artdafen/about-partner3.webp"),
        title: "French Art Fund"
      },
      {
        id: 4,
        img: imagePrefix("/static/artdafen/about-partner4.webp"),
        title: "President of Claremont University\u2019s Art Institute, USA"
      },
      {
        id: 5,
        img: imagePrefix("/static/artdafen/about-partner5.webp"),
        title: "Singapore TV Station"
      },
      {
        id: 6,
        img: imagePrefix("/static/artdafen/about-partner6.webp"),
        title: "Peng Wenbin, Artistic Director of the Guangzhou Art Fair"
      },
      {
        id: 7,
        img: imagePrefix("/static/artdafen/about-partner7.webp"),
        title: "Korean artist Park Jeolhwan"
      },
      {
        id: 8,
        img: imagePrefix("/static/artdafen/about-partner8.webp"),
        title: "Hollywood Director Mike"
      },
      {
        id: 9,
        img: imagePrefix("/static/artdafen/about-partner9.webp"),
        title: "Russian artist Elena"
      },
      {
        id: 10,
        img: imagePrefix("/static/artdafen/about-partner10.webp"),
        title: "Artist - French artist Mike"
      },
      {
        id: 11,
        img: imagePrefix("/static/artdafen/about-partner11.webp"),
        title: "Artist - Italian sculptor Giuseppe Angelo"
      },
      {
        id: 12,
        img: imagePrefix("/static/artdafen/about-partner12.webp"),
        title: "Belarusian artist Kaliya"
      },
      {
        id: 13,
        img: imagePrefix("/static/artdafen/about-partner13.webp"),
        title: "Danish artist Peter Ilersted"
      },
      {
        id: 14,
        img: imagePrefix("/static/artdafen/about-partner14.webp"),
        title: "Russian artist Sergey"
      },
      {
        id: 15,
        img: imagePrefix("/static/artdafen/about-partner15.webp"),
        title: "John Hawkins - Father of the Global Creative Industries, Renowned British Expert in Creative Cultural Industries"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_ClientOnly = __nuxt_component_1$2;
      const _directive_aos = resolveDirective("aos");
      let _temp0, _temp1;
      _push(`<!--[--><section class="banner-section" style="${ssrRenderStyle({ backgroundImage: `url(${unref(bannerImage)})` })}" data-v-fdd3845b></section><section class="intro-section" data-v-fdd3845b><div class="intro-box acea-row" data-v-fdd3845b><div class="intro-box-left border-r-sm" data-v-fdd3845b><div class="acea-row row-middle row-column f-bold-500 viscosity" data-v-fdd3845b><div data-v-fdd3845b><p${ssrRenderAttrs(mergeProps({ class: "text-50" }, ssrGetDirectiveProps(_ctx, _directive_aos, "zoom-in-up")))} data-v-fdd3845b>ABOUT<br data-v-fdd3845b> ART<br data-v-fdd3845b> DAFEN</p><p${ssrRenderAttrs(mergeProps({ class: "text-16 text-gray-600 mt-10" }, ssrGetDirectiveProps(_ctx, _directive_aos, "zoom-in-up")))} data-v-fdd3845b> Since 1989 \xB7 <br data-v-fdd3845b> Reimagined 2020<br data-v-fdd3845b> Classic \xD7 Original<br data-v-fdd3845b> Art That Lights Up Life<br data-v-fdd3845b></p></div></div></div><div class="intro-box-right" data-v-fdd3845b><div class="max-wrap" data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "app-title text-50 f-bold-500 mb-40 text-center" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b>ABOUT ART DAF EN</div><div${ssrRenderAttrs(mergeProps({ class: "text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> WHERE IT ALL BEGAN: THE ROOTS OF DAFEN </div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> In 1989, Hong Kong art dealer Mr. Huang Jiang came to Dafen Village in Shenzhen\u2019s Longgang District. Drawn by affordable rents and its proximity to the Shenzhen Special Economic Zone, he set up an oil painting workshop and recruited painters to replicate artworks for overseas markets. <br data-v-fdd3845b><br data-v-fdd3845b> Mr. Huang is widely recognized as the founding figure of Dafen\u2019s oil painting industry. He was the inaugural chairman of the Dafen Fine Arts Industry Association and later honored as its lifelong honorary president. <br data-v-fdd3845b><br data-v-fdd3845b> In its early years, Dafen\u2019s art industry operated under a \u201Cprocessing with supplied materials\u201D\xA0model\u2014mass-producing replica oil paintings mainly for Europe, America, and the Middle East. As demand increased, apprentices, painters, and art school graduates gathered in Dafen, forming a complete industrial chain that included production, sales, and logistics. </p><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> A NEW CHAPTER: TRANSFORMATION THROUGH CREATIVITY </div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> In the early 2000s, Dafen began a transformation. With support from government initiatives, the village gradually shifted from mass replication toward cultivating original art. Cultural events, exhibitions, and art festivals brought new vitality to the community, drawing in artists with creative aspirations. <br data-v-fdd3845b><br data-v-fdd3845b> In 2004, Dafen was officially named a \u201CNational Cultural Industry Demonstration Base\u201D\xA0by China\u2019s Ministry of Culture. While replication remained important, new art forms like sculpture, printmaking, and artistic derivatives emerged. Dafen evolved into a vibrant hub where tradition met innovation, changing from a simple oil painting village into a true art community. </p><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> FOUNDER\u2019S STORY: FROM DAFEN TO THE WORLD </div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> Since 2004, Mr. Zhou Feng has been deeply rooted in Dafen\u2019s art ecosystem. That year, he founded Fine Art Studio, followed by Shenzhen Fine Art Co., Ltd. in 2006 and Hong Kong\u2019s Yagene International Art Co., Limited in 2009. <br data-v-fdd3845b><br data-v-fdd3845b> Over the past two decades, he has been a witness, a practitioner, a driving force, and a guiding figure in Dafen\u2019s transformation from a center of replica oil painting to a hub of artistic innovation. <br data-v-fdd3845b><br data-v-fdd3845b> In 2016, Mr. Zhou was appointed Chairman of the Dafen Fine Arts Industry Association. Under his leadership, Dafen accelerated its digital transformation by launching an e-commerce service center that brought the industry online and expanded its global reach. He also formed international exhibition delegations that connected Dafen\u2019s top artworks directly with global audiences, elevating the village onto the world art stage. <br data-v-fdd3845b><br data-v-fdd3845b> Today, Dafen Oil Painting Village is home to over 30,000 art professionals, including more than 8,000 skilled painters and 1,200 original artists. Its thriving ecosystem generates billions of yuan in annual value and has become a cultural tourism destination that welcomes visitors from around the world. </p><br data-v-fdd3845b><br data-v-fdd3845b><img${ssrRenderAttrs(_temp0 = mergeProps({
        class: "w-full",
        src: unref(imagePrefix)("/static/artdafen/about-story1.webp"),
        alt: "Zhou Feng"
      }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}<br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> THE BIRTH OF ART DAFEN </div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> The founding of Art Dafen draws inspiration from the philosophy of Leonardo da Vinci, whose dedication to exploring nature and blending art with science resonates deeply with the spirit of Dafen\u2019s artists. In this land shaped by creativity and craftsmanship, Mr. Zhou Feng found a vision that aligned with these timeless values. <br data-v-fdd3845b><br data-v-fdd3845b> In 2020, after years of dedication and preparation, Mr. Zhou officially established the Art Dafen brand and launched the online platform artdafen.com. The brand\u2019s mission is to promote skilled craftsmanship, support visionary artists, and bring original, high-quality art into everyday life. <br data-v-fdd3845b><br data-v-fdd3845b> The name \u201CArt Dafen\u201D\xA0pays tribute to its birthplace, Dafen Village, while also echoing the name \u201Cda Vinci,\u201D\xA0the Renaissance master who symbolizes the fusion of art and science. This meaningful connection reflects the brand\u2019s goal to bridge East and West, tradition and innovation, and to redefine how art enriches modern global living. </p><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> FROM TRADITION TO INNOVATION IN EVERYDAY LIFE </div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> Art Dafen believes that art should extend beyond galleries and museums to inspire everyday life. By transforming classical artistry into tableware, clothing, art derivatives, and lifestyle products, the brand helps people rediscover beauty in the objects they use daily. <br data-v-fdd3845b><br data-v-fdd3845b> Through collaborations with contemporary artists, Art Dafen experiments with new materials and visual styles, creating original works that blend Eastern aesthetics with global sensibilities. <br data-v-fdd3845b><br data-v-fdd3845b> The brand is also committed to education and outreach, striving to make art approachable and accessible to people from all backgrounds while inspiring the next generation of creators. </p><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> ART IN EVERYDAY LIFE </div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> We believe art should not be confined to galleries or museums\u2014it should inspire everyday living. At Art Dafen, we transform classical art languages into lifestyle objects, home d\xE9cor, and cultural products, awakening a global appreciation for beauty through design and creativity. </p><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><br data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> GLOBAL COLLABORATION AND CULTURAL EXCHANGE </div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> Rooted in Eastern artistry, Art Dafen embraces a global outlook. The brand partners with artists and designers from Europe, North America, Southeast Asia, and the Middle East to foster meaningful cross-cultural collaboration. <br data-v-fdd3845b><br data-v-fdd3845b> Art Dafen\u2019s works have been showcased in international exhibitions and found places in homes and public spaces worldwide, carrying the spirit of Dafen across borders. </p></div></div></div></section><section class="vision-section border-t-sm border-b-sm" data-v-fdd3845b><h2${ssrRenderAttrs(mergeProps({ class: "text-50 f-bold-500 mb-40 text-center" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b>OUR VISION</h2><p${ssrRenderAttrs(mergeProps({ class: "text-22 desc text-center" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> Art Dafen\u2019s vision is to help the world discover Dafen through art and to make \u201CDafen\u201D a recognized name in the history of the global art industry. The brand connects cultures, transcends boundaries, and embodies the spirit of craftsmanship that defines its story. Above all, Art Dafen aims to foster a global community where creativity and culture inspire ongoing dialogue and collaboration. </p></section><section class="intro-section" data-v-fdd3845b><div class="intro-box acea-row" data-v-fdd3845b><div class="intro-box-left border-r-sm" data-v-fdd3845b><div class="acea-row row-middle row-column f-bold-500 viscosity" data-v-fdd3845b><p${ssrRenderAttrs(mergeProps({ class: "text-50" }, ssrGetDirectiveProps(_ctx, _directive_aos, "zoom-in-up")))} data-v-fdd3845b>INDUSTRY<br data-v-fdd3845b>RECOGNITION</p><p${ssrRenderAttrs(_temp1 = mergeProps({ class: "text-16 text-gray-600 mt-10" }, ssrGetDirectiveProps(_ctx, _directive_aos, "zoom-in-up")))} data-v-fdd3845b>${"textContent" in _temp1 ? ssrInterpolate(_temp1.textContent) : (_b = _temp1.innerHTML) != null ? _b : ""}</p></div></div><div class="intro-box-right" data-v-fdd3845b><div class="max-wrap" data-v-fdd3845b><div${ssrRenderAttrs(mergeProps({ class: "app-title text-50 f-bold-500 mb-40 text-center" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b>HONORS</div><p${ssrRenderAttrs(mergeProps({ class: "text-22" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> Over the years, Mr. Zhou Feng and his affiliated companies have earned wide recognition for their contributions to the art industry, both in China and internationally. Their leadership and innovation have been acknowledged through the following roles and honors: </p><br data-v-fdd3845b><ul${ssrRenderAttrs(mergeProps({ class: "text-22 list-ul disc" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b><li data-v-fdd3845b>Chairman and Honorary Chairman Unit of the Shenzhen Dafen Fine Arts Industry Association</li><li data-v-fdd3845b>Official Operator of the Oil Painting Trade Promotion Center at the Shenzhen National Cultural Trade Base</li><li data-v-fdd3845b>Designated Operator of the Cultural and Art Industry Service Center under the National Art Authentication and Registration Program</li><li data-v-fdd3845b>Executive Chairman Unit of the Shenzhen Creative Design Intellectual Property Promotion Association</li><li data-v-fdd3845b>Operator of the Material Selection Center for the Shenzhen Interior Designers Association</li><li data-v-fdd3845b>Honorary Supporter of the internationally recognized IDEA-TOPS Design Awards</li></ul><div${ssrRenderAttrs(mergeProps({ class: "mt-40 py-10 px-25" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b><div class="album-group" data-v-fdd3845b><img${ssrRenderAttr("src", unref(imagePrefix)("/static/artdafen/about-honor1.webp"))} alt="honor1" data-v-fdd3845b><img${ssrRenderAttr("src", unref(imagePrefix)("/static/artdafen/about-honor2.webp"))} alt="honor2" data-v-fdd3845b></div></div><p${ssrRenderAttrs(mergeProps({ class: "text-16 text-gray-600 f-bold-500" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b> Oil Painting Trade Promotion Center, National Cultural Trade Base (Shenzhen) </p></div></div></div></section><section class="partner-section" data-v-fdd3845b><div class="partner-box" data-v-fdd3845b><h2${ssrRenderAttrs(mergeProps({ class: "text-50 f-bold-500 text-center mb-lg-80 mb-40" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-fdd3845b>INTERNATIONAL PARTNERS</h2>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fdd3845b"]]);

export { about as default };
//# sourceMappingURL=about-B0KuYCFE.mjs.map
