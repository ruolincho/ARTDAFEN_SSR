import {defineStore} from 'pinia'
import piniaPersistConfig from "../helper/persist";
import type {IMine} from "~/api/interface/mine/mine";
import type {IHome} from "~/api/interface/home/home";
import {getUserBaseInfoApi, getUserEchoInfoApi} from "~/api/modules/mine/mine";
import { imagePrefix } from "~/utils";
import {checkToken} from "~/api/modules/oauth/oauth";
import {computed, ref} from 'vue';

export const useUserStore = defineStore(
    'user',
    () => {
        const token = ref('');
        const userInfo = ref({} as IMine.UserInfoRow);
        const isLogin = computed(() => !!token.value)
        const headerList = ref<IHome.MenuRow[]>([])

        const setToken = (tokenStr: string) => {
            token.value = tokenStr;
            // 用 Cookie 保存 token（SSR、CSR 都能读）
            const tokenCookie = useCookie('auth_token', {
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 3, // 3天
                // httpOnly: true // 如果需要前端也读取，就不要设 httpOnly；如需更安全策略，请改为后端 Set-Cookie
            })
            tokenCookie.value = tokenStr
        }

        const getUserInfo = async () => {
            const {data} = await getUserBaseInfoApi()
            setUserInfo(data)
        }

        const getUserEcho = async () => {
            const {data} = await getUserEchoInfoApi()
            setUserInfo(data)
        }

        const setUserInfo = (info: IMine.UserInfoRow) => {
            info.avatar = imagePrefix(info.avatar, true) + `?t=${new Date().getTime()}`
            userInfo.value = {
                ...userInfo.value,
                ...info,
            }
        }

        const clear = (jump: boolean = true) => {
            const router = useRouter()
            token.value = '';
            const tokenCookie = useCookie('auth_token', { path: '/' })
            tokenCookie.value = ''
            userInfo.value = {} as IMine.UserInfoRow;
            headerList.value = []
            jump && router.replace('/')
        }

        // 检测Token是否过期
        const checkTokenStatus = async () => {
            if (!import.meta.client) return false
            if (!token.value) return false
            const {data} = await checkToken()
            !data && clear(false)
        }

        const setHeaderList = (list: IHome.MenuRow[]) => {
            headerList.value = list
        }

        const updateSubscribe = (subscribe: Dict.SubscribeType) => {
            userInfo.value.subscribe = subscribe
        }

        return {
            isLogin,
            token,
            userInfo,
            setToken,
            getUserInfo,
            getUserEcho,
            clear,
            checkTokenStatus,
            headerList,
            setHeaderList,
            updateSubscribe,
        };
    },
    {
        persist: piniaPersistConfig('user')
    }
);