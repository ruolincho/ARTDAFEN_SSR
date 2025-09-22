import {onMounted, ref} from 'vue'

const currentLang = ref('')

export function useTranslateLang() {
    const languageData = ref([
        {
            "id": "english",
            "name": "English",
            "serviceId": "en"
        },
        {
            "id": "french",
            "name": "Français",
            "serviceId": "fr"
        },
        {
            "id": "deutsch",
            "name": "Deutsch",
            "serviceId": "de"
        },
        {
            "id": "spanish",
            "name": "Español",
            "serviceId": "es"
        },
        {
            "id": "italian",
            "name": "italiano",
            "serviceId": "it"
        },
        {
            "id": "portuguese",
            "name": "português",
            "serviceId": "pt"
        },
        {
            "id": "dutch",
            "name": "nederlands",
            "serviceId": "nl"
        },
        {
            "id": "polish",
            "name": "Polski",
            "serviceId": "pl"
        },
        {
            "id": "swedish",
            "name": "Svenska",
            "serviceId": "sv"
        },
        {
            "id": "danish",
            "name": "dansk",
            "serviceId": "da"
        },
        {
            "id": "norwegian",
            "name": "Norge",
            "serviceId": "no"
        },
        {
            "id": "finnish",
            "name": "suomi",
            "serviceId": "fi"
        },
        {
            "id": "icelandic",
            "name": "ÍslandName",
            "serviceId": "is"
        },
        {
            "id": "estonian",
            "name": "eesti keel",
            "serviceId": "et"
        },
        {
            "id": "latvian",
            "name": "latviešu",
            "serviceId": "lv"
        },
        {
            "id": "lithuanian",
            "name": "Lietuva",
            "serviceId": "lt"
        },
        {
            "id": "greek",
            "name": "ελληνικά",
            "serviceId": "el"
        },
        {
            "id": "romanian",
            "name": "Română",
            "serviceId": "ro"
        },
        {
            "id": "czech",
            "name": "český",
            "serviceId": "cs"
        },
        {
            "id": "slovak",
            "name": "Slovenská",
            "serviceId": "sk"
        },
        {
            "id": "slovene",
            "name": "slovenščina",
            "serviceId": "sl"
        },
        {
            "id": "hungarian",
            "name": "magyar",
            "serviceId": "hu"
        },
        {
            "id": "croatian",
            "name": "hrvatski",
            "serviceId": "hr"
        },
        {
            "id": "chinese_traditional",
            "name": "繁體中文",
            "serviceId": "zh-TW"
        }
    ])

    onMounted(() => {
        if (process.client && window.translate) {
            // 初始化一次
            currentLang.value = transformLang(window.translate.language.getCurrent())

            // 只代理一次，避免重复绑定
            if (!(window as any)._translateChangeLanguageProxy) {
                const originalChange = window.translate.changeLanguage
                window.translate.changeLanguage = function (lang: string) {
                    currentLang.value = transformLang(lang) // 更新响应式数据
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
        const langData = languageData.value.find(item => item.id === lang)
        return langData?.name || lang
    }

    return {currentLang, languageData, switchLanguage}
}
