import {onMounted, ref, computed} from 'vue'
import type {Language} from "element-plus/es/locale";

// i18n-jsautotranslate 所支持的语言数据
const LANGUAGE_JSON = [
    {
        "id": "mepeti",
        "name": "Sepeti",
        "serviceId": "nso"
    },
    {
        "id": "corsican",
        "name": "hinaassicurasol",
        "serviceId": "co"
    },
    {
        "id": "guarani",
        "name": "ondoho",
        "serviceId": "gn"
    },
    {
        "id": "kinyarwanda",
        "name": "Kinyarwanda",
        "serviceId": "rw"
    },
    {
        "id": "hausa",
        "name": "dictionary variant",
        "serviceId": "ha"
    },
    {
        "id": "norwegian",
        "name": "Norge",
        "serviceId": "no"
    },
    {
        "id": "dutch",
        "name": "nederlands",
        "serviceId": "nl"
    },
    {
        "id": "yoruba",
        "name": "Yoruba",
        "serviceId": "yo"
    },
    {
        "id": "english",
        "name": "English",
        "serviceId": "en"
    },
    {
        "id": "gongen",
        "name": "गोंगेन हें नांव",
        "serviceId": "gom"
    },
    {
        "id": "latin",
        "name": "Latina",
        "serviceId": "la"
    },
    {
        "id": "nepali",
        "name": "नेपालीName",
        "serviceId": "ne"
    },
    {
        "id": "french",
        "name": "Français",
        "serviceId": "fr"
    },
    {
        "id": "czech",
        "name": "český",
        "serviceId": "cs"
    },
    {
        "id": "hawaiian",
        "name": "panekeʻhaka",
        "serviceId": "haw"
    },
    {
        "id": "georgian",
        "name": "ჯორჯიანიName",
        "serviceId": "ka"
    },
    {
        "id": "russian",
        "name": "Русский язык",
        "serviceId": "ru"
    },
    {
        "id": "serbian",
        "name": "Српски",
        "serviceId": "sr"
    },
    {
        "id": "chinese_simplified",
        "name": "简体中文",
        "serviceId": "zh-CN"
    },
    {
        "id": "persian",
        "name": "Persian",
        "serviceId": "fa"
    },
    {
        "id": "bhojpuri",
        "name": "हमार कपार दर्द करता।",
        "serviceId": "bho"
    },
    {
        "id": "javanese",
        "name": "basa jawa",
        "serviceId": "jw"
    },
    {
        "id": "hindi",
        "name": "हिन्दी",
        "serviceId": "hi"
    },
    {
        "id": "belarusian",
        "name": "БеларускаяName",
        "serviceId": "be"
    },
    {
        "id": "kazakh",
        "name": "қазақ",
        "serviceId": "kk"
    },
    {
        "id": "swahili",
        "name": "Kiswahili",
        "serviceId": "sw"
    },
    {
        "id": "oriya",
        "name": "ଓଡିଆ",
        "serviceId": "or"
    },
    {
        "id": "icelandic",
        "name": "ÍslandName",
        "serviceId": "is"
    },
    {
        "id": "yiddish",
        "name": "ייַדיש",
        "serviceId": "yi"
    },
    {
        "id": "twi",
        "name": "Ma frɛ",
        "serviceId": "ak"
    },
    {
        "id": "irish",
        "name": "Íris",
        "serviceId": "ga"
    },
    {
        "id": "gujarati",
        "name": "ગુજરાતી",
        "serviceId": "gu"
    },
    {
        "id": "khmer",
        "name": "ភាសា​ខ្មែរName",
        "serviceId": "km"
    },
    {
        "id": "slovak",
        "name": "Slovenská",
        "serviceId": "sk"
    },
    {
        "id": "hebrew",
        "name": "היברית",
        "serviceId": "iw"
    },
    {
        "id": "kannada",
        "name": "ಕನ್ನಡ್Name",
        "serviceId": "kn"
    },
    {
        "id": "hungarian",
        "name": "magyar",
        "serviceId": "hu"
    },
    {
        "id": "ilocano",
        "name": "Ilocano",
        "serviceId": "ilo"
    },
    {
        "id": "sundanese",
        "name": "basa Sunda",
        "serviceId": "su"
    },
    {
        "id": "tamil",
        "name": "தாமில்",
        "serviceId": "ta"
    },
    {
        "id": "arabic",
        "name": "بالعربية",
        "serviceId": "ar"
    },
    {
        "id": "bengali",
        "name": "বেঙ্গালী",
        "serviceId": "bn"
    },
    {
        "id": "azerbaijani",
        "name": "azerbaijani",
        "serviceId": "az"
    },
    {
        "id": "samoan",
        "name": "lifiava",
        "serviceId": "sm"
    },
    {
        "id": "afrikaans",
        "name": "afrikaans",
        "serviceId": "af"
    },
    {
        "id": "indonesian",
        "name": "IndonesiaName",
        "serviceId": "id"
    },
    {
        "id": "danish",
        "name": "dansk",
        "serviceId": "da"
    },
    {
        "id": "uyghur",
        "name": "ئۇيغۇر",
        "serviceId": "ug"
    },
    {
        "id": "afrikaans_xhosa",
        "name": "Afrikaans isiXhosa",
        "serviceId": "xh"
    },
    {
        "id": "meitei",
        "name": "ꯃꯦꯏꯇꯦꯏ꯫",
        "serviceId": "mni-Mtei"
    },
    {
        "id": "shona",
        "name": "Shona",
        "serviceId": "sn"
    },
    {
        "id": "bambara",
        "name": "Bamanankan",
        "serviceId": "bm"
    },
    {
        "id": "lithuanian",
        "name": "Lietuva",
        "serviceId": "lt"
    },
    {
        "id": "uzbek",
        "name": "o'zbek",
        "serviceId": "uz"
    },
    {
        "id": "vietnamese",
        "name": "Tiếng Việt",
        "serviceId": "vi"
    },
    {
        "id": "lingala",
        "name": "Lingala",
        "serviceId": "ln"
    },
    {
        "id": "maltese",
        "name": "Malti",
        "serviceId": "mt"
    },
    {
        "id": "turkmen",
        "name": "Türkmençe",
        "serviceId": "tk"
    },
    {
        "id": "assamese",
        "name": "assamese",
        "serviceId": "as"
    },
    {
        "id": "catalan",
        "name": "català",
        "serviceId": "ca"
    },
    {
        "id": "singapore",
        "name": "සිංගාපුර්",
        "serviceId": "si"
    },
    {
        "id": "cebuano",
        "name": "cebuano",
        "serviceId": "ceb"
    },
    {
        "id": "sanskrit",
        "name": "Sanskrit",
        "serviceId": "sa"
    },
    {
        "id": "polish",
        "name": "Polski",
        "serviceId": "pl"
    },
    {
        "id": "galician",
        "name": "galico",
        "serviceId": "gl"
    },
    {
        "id": "latvian",
        "name": "latviešu",
        "serviceId": "lv"
    },
    {
        "id": "ukrainian",
        "name": "Україна",
        "serviceId": "uk"
    },
    {
        "id": "tatar",
        "name": "Татар",
        "serviceId": "tt"
    },
    {
        "id": "scottish_gaelic",
        "name": "Gàidhlig na h-Alba",
        "serviceId": "gd"
    },
    {
        "id": "welsh",
        "name": "Iaith Weleg",
        "serviceId": "cy"
    },
    {
        "id": "japanese",
        "name": "日本語",
        "serviceId": "ja"
    },
    {
        "id": "filipino",
        "name": "Pilipino",
        "serviceId": "tl"
    },
    {
        "id": "aymara",
        "name": "aymara.",
        "serviceId": "ay"
    },
    {
        "id": "lao",
        "name": "ກະຣຸນາ",
        "serviceId": "lo"
    },
    {
        "id": "mongolian",
        "name": "Монгол",
        "serviceId": "mn"
    },
    {
        "id": "telugu",
        "name": "తెలుగుName",
        "serviceId": "te"
    },
    {
        "id": "romanian",
        "name": "Română",
        "serviceId": "ro"
    },
    {
        "id": "haitian_creole",
        "name": "Kreyòl ayisyen",
        "serviceId": "ht"
    },
    {
        "id": "dogrid",
        "name": "कुकुरमुत्ता",
        "serviceId": "doi"
    },
    {
        "id": "swedish",
        "name": "Svenska",
        "serviceId": "sv"
    },
    {
        "id": "maithili",
        "name": "मरातिलीName",
        "serviceId": "mai"
    },
    {
        "id": "malagasy",
        "name": "Malagasy",
        "serviceId": "mg"
    },
    {
        "id": "thai",
        "name": "คนไทย",
        "serviceId": "th"
    },
    {
        "id": "armenian",
        "name": "Արմենյան",
        "serviceId": "hy"
    },
    {
        "id": "burmese",
        "name": "ဗာရမ်",
        "serviceId": "my"
    },
    {
        "id": "pashto",
        "name": "پښتوName",
        "serviceId": "ps"
    },
    {
        "id": "hmong",
        "name": "hmong",
        "serviceId": "hmn"
    },
    {
        "id": "dhivehi",
        "name": "ދިވާރީވް",
        "serviceId": "dv"
    },
    {
        "id": "chinese_traditional",
        "name": "繁體中文",
        "serviceId": "zh-TW"
    },
    {
        "id": "luxembourgish",
        "name": "LëtzebuergeschName",
        "serviceId": "lb"
    },
    {
        "id": "sindhi",
        "name": "سنڌي",
        "serviceId": "sd"
    },
    {
        "id": "kurdish",
        "name": "Kurdî",
        "serviceId": "ku"
    },
    {
        "id": "turkish",
        "name": "Türkçe",
        "serviceId": "tr"
    },
    {
        "id": "macedonian",
        "name": "Македонски",
        "serviceId": "mk"
    },
    {
        "id": "bulgarian",
        "name": "български",
        "serviceId": "bg"
    },
    {
        "id": "malay",
        "name": "Malay",
        "serviceId": "ms"
    },
    {
        "id": "sesotho",
        "name": "sesotho",
        "serviceId": "st"
    },
    {
        "id": "luganda",
        "name": "luganda",
        "serviceId": "lg"
    },
    {
        "id": "south_african_zulu",
        "name": "IsiZulu saseNingizimu Afrika",
        "serviceId": "zu"
    },
    {
        "id": "marathi",
        "name": "मराठीName",
        "serviceId": "mr"
    },
    {
        "id": "estonian",
        "name": "eesti keel",
        "serviceId": "et"
    },
    {
        "id": "malayalam",
        "name": "മലമാലം",
        "serviceId": "ml"
    },
    {
        "id": "deutsch",
        "name": "Deutsch",
        "serviceId": "de"
    },
    {
        "id": "slovene",
        "name": "slovenščina",
        "serviceId": "sl"
    },
    {
        "id": "urdu",
        "name": "اوردو",
        "serviceId": "ur"
    },
    {
        "id": "portuguese",
        "name": "português",
        "serviceId": "pt"
    },
    {
        "id": "igbo",
        "name": "igbo",
        "serviceId": "ig"
    },
    {
        "id": "tigri",
        "name": "ትግርኛ",
        "serviceId": "ti"
    },
    {
        "id": "kurdish_sorani",
        "name": "کوردی سۆرانی",
        "serviceId": "ckb"
    },
    {
        "id": "oromo",
        "name": "adeta",
        "serviceId": "om"
    },
    {
        "id": "greek",
        "name": "ελληνικά",
        "serviceId": "el"
    },
    {
        "id": "spanish",
        "name": "Español",
        "serviceId": "es"
    },
    {
        "id": "frisian",
        "name": "frysk",
        "serviceId": "fy"
    },
    {
        "id": "somali",
        "name": "Soomaali",
        "serviceId": "so"
    },
    {
        "id": "mizo",
        "name": "Mizo tawng",
        "serviceId": "lus"
    },
    {
        "id": "amharic",
        "name": "amharic",
        "serviceId": "am"
    },
    {
        "id": "nyanja",
        "name": "potakuyan",
        "serviceId": "ny"
    },
    {
        "id": "punjabi",
        "name": "ਪੰਜਾਬੀName",
        "serviceId": "pa"
    },
    {
        "id": "basque",
        "name": "baskoa",
        "serviceId": "eu"
    },
    {
        "id": "italian",
        "name": "italiano",
        "serviceId": "it"
    },
    {
        "id": "albanian",
        "name": "albanian",
        "serviceId": "sq"
    },
    {
        "id": "korean",
        "name": "한국어",
        "serviceId": "ko"
    },
    {
        "id": "tajik",
        "name": "ТаjikӣName",
        "serviceId": "tg"
    },
    {
        "id": "finnish",
        "name": "suomi",
        "serviceId": "fi"
    },
    {
        "id": "kyrgyz",
        "name": "Кыргыз тили",
        "serviceId": "ky"
    },
    {
        "id": "ewe",
        "name": "Eʋegbe",
        "serviceId": "ee"
    },
    {
        "id": "croatian",
        "name": "hrvatski",
        "serviceId": "hr"
    },
    {
        "id": "zongjia",
        "name": "zongjia",
        "serviceId": "ts"
    },
    {
        "id": "creole",
        "name": "a n:n",
        "serviceId": "kri"
    },
    {
        "id": "quechua",
        "name": "Quechua",
        "serviceId": "qu"
    },
    {
        "id": "bosnian",
        "name": "bosnian",
        "serviceId": "bs"
    },
    {
        "id": "maori",
        "name": "Maori",
        "serviceId": "mi"
    }
]

// 需要开启翻译的语言
const TRANSLATE_LANG_LIST = [
    "english",
    "french",
    "deutsch",
    "spanish",
    "italian",
    "portuguese",
    "dutch",
    "polish",
    "swedish",
    "danish",
    "norwegian",
    "finnish",
    "icelandic",
    "estonian",
    "latvian",
    "lithuanian",
    "greek",
    "romanian",
    "czech",
    "slovak",
    "slovene",
    "hungarian",
    "croatian",
    "chinese_traditional",
    "chinese_simplified",
]

const currentServiceId = ref('') // en / zh-TW
const currentLang = ref('') // English / 中文（繁体）
const currentElementPlusLocale = ref<Language>()
const elementPlusLocaleMap: Record<string, () => Promise<any>> = {
    en: () => import('element-plus/es/locale/lang/en'),
    fr: () => import('element-plus/es/locale/lang/fr'),
    de: () => import('element-plus/es/locale/lang/de'),
    es: () => import('element-plus/es/locale/lang/es'),
    it: () => import('element-plus/es/locale/lang/it'),
    pt: () => import('element-plus/es/locale/lang/pt'),
    nl: () => import('element-plus/es/locale/lang/nl'),
    pl: () => import('element-plus/es/locale/lang/pl'),
    sv: () => import('element-plus/es/locale/lang/sv'),
    da: () => import('element-plus/es/locale/lang/da'),
    no: () => import('element-plus/es/locale/lang/no'),
    fi: () => import('element-plus/es/locale/lang/fi'),
    et: () => import('element-plus/es/locale/lang/et'),
    lv: () => import('element-plus/es/locale/lang/lv'),
    lt: () => import('element-plus/es/locale/lang/lt'),
    el: () => import('element-plus/es/locale/lang/el'),
    ro: () => import('element-plus/es/locale/lang/ro'),
    cs: () => import('element-plus/es/locale/lang/cs'),
    sk: () => import('element-plus/es/locale/lang/sk'),
    sl: () => import('element-plus/es/locale/lang/sl'),
    hu: () => import('element-plus/es/locale/lang/hu'),
    hr: () => import('element-plus/es/locale/lang/hr'),
    'zh-TW': () => import('element-plus/es/locale/lang/zh-tw'),
    az: () => import('element-plus/es/locale/lang/az'),
    fa: () => import('element-plus/es/locale/lang/fa'),
    th: () => import('element-plus/es/locale/lang/th'),
    id: () => import('element-plus/es/locale/lang/id'),
    bg: () => import('element-plus/es/locale/lang/bg'),
    ca: () => import('element-plus/es/locale/lang/ca'),
    uk: () => import('element-plus/es/locale/lang/uk'),
    tk: () => import('element-plus/es/locale/lang/tk'),
    ta: () => import('element-plus/es/locale/lang/ta'),
    af: () => import('element-plus/es/locale/lang/af'),
    ar: () => import('element-plus/es/locale/lang/ar'),
    he: () => import('element-plus/es/locale/lang/he'),
    lo: () => import('element-plus/es/locale/lang/lo'),
    mn: () => import('element-plus/es/locale/lang/mn'),
    kk: () => import('element-plus/es/locale/lang/kk'),
    ku: () => import('element-plus/es/locale/lang/ku'),
    ckb: () => import('element-plus/es/locale/lang/ckb'),
    km: () => import('element-plus/es/locale/lang/km'),
    sr: () => import('element-plus/es/locale/lang/sr'),
    eu: () => import('element-plus/es/locale/lang/eu'),
    ky: () => import('element-plus/es/locale/lang/ky'),
    bn: () => import('element-plus/es/locale/lang/bn'),
    ms: () => import('element-plus/es/locale/lang/ms'),
    mg: () => import('element-plus/es/locale/lang/mg'),
    sw: () => import('element-plus/es/locale/lang/sw'),
    my: () => import('element-plus/es/locale/lang/my'),
    hi: () => import('element-plus/es/locale/lang/hi'),
    te: () => import('element-plus/es/locale/lang/te'),
    ru: () => import('element-plus/es/locale/lang/ru'),
    tr: () => import('element-plus/es/locale/lang/tr'),
    ja: () => import('element-plus/es/locale/lang/ja'),
    ko: () => import('element-plus/es/locale/lang/ko'),
    vi: () => import('element-plus/es/locale/lang/vi'),
    'zh-CN': () => import('element-plus/es/locale/lang/zh-cn')
    // is: null, // Not supported, will default to en
};

export function useTranslateLang() {

    // 找到需要开启翻译的语言并且排序
    const languageData = computed(() => {
        return LANGUAGE_JSON
            .filter(item => TRANSLATE_LANG_LIST.includes(item.id))
            .sort((a, b) => TRANSLATE_LANG_LIST.indexOf(a.id) - TRANSLATE_LANG_LIST.indexOf(b.id))
            // .filter((item) => item.name !== currentLang.value)
    })

    onMounted(async () => {
        if (process.client && window.translate) {
            // 初始化一次
            const initialLang = window.translate.language.getCurrent();
            currentLang.value = transformLang(initialLang)
            await updateElementPlusLocale(initialLang)

            // 只代理一次，避免重复绑定
            if (!(window as any)._translateChangeLanguageProxy) {
                const originalChange = window.translate.changeLanguage
                window.translate.changeLanguage = async function (lang: string) {
                    currentLang.value = transformLang(lang) // 更新响应式数据
                    await updateElementPlusLocale(lang)
                    return originalChange.call(this, lang)
                }
                ;(window as any)._translateChangeLanguageProxy = true
            }
        }
    })

    const switchLanguage = (lang: string) => {
        if (process.client && window.translate) {
            window.translate?.changeLanguage(lang)
        }
    }

    const transformLang = (lang: string) => {
        const langData = LANGUAGE_JSON.find(item => item.id === lang)
        return langData?.name || lang
    }

    const updateElementPlusLocale = async (lang: string) => {
        const langData = LANGUAGE_JSON.find((item) => item.id === lang);
        const serviceId = langData?.serviceId || 'en';
        const localeImport = elementPlusLocaleMap[serviceId] ?? elementPlusLocaleMap.en!;
        const { default: locale } = await localeImport();
        currentElementPlusLocale.value = locale;
        currentServiceId.value = serviceId;
    };

    return {currentLang, languageData, switchLanguage, currentElementPlusLocale, currentServiceId}
}
