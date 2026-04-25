import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import piniaPersistConfig from "../helper/persist";
import type {DeviceType} from "../interface/app";
import type {IHome} from "~/api/interface/home/home";

export const useAppStore = defineStore(
    'app',
    () => {
        const codeCountDown = ref(0); // 验证码倒计时
        const lastStartTime = ref<number | null>(null); // 记录倒计时开始的时间戳
        let timer: any = null; // 验证码倒计时定时器

        const device = ref<DeviceType>('pc'); // 设备类型

        // 启动验证码倒计时
        const startCodeCountDown = (seconds = 60) => {
            // 记录倒计时的起始时间
            lastStartTime.value = Date.now();
            codeCountDown.value = seconds;

            if (timer) clearInterval(timer);
            timer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - lastStartTime.value!) / 1000);
                const remaining = seconds - elapsed;

                if (remaining > 0) {
                    codeCountDown.value = remaining;
                } else {
                    clearInterval(timer!);
                    timer = null;
                    codeCountDown.value = 0;
                    lastStartTime.value = null;
                }
            }, 1000);
        };

        // 刷新时重新计算倒计时
        const resumeCountdown = () => {
            if (lastStartTime.value) {
                const elapsed = Math.floor((Date.now() - lastStartTime.value) / 1000);
                const remaining = codeCountDown.value - elapsed;
                if (remaining > 0) {
                    startCodeCountDown(remaining); // 继续倒计时
                } else {
                    codeCountDown.value = 0;
                    lastStartTime.value = null;
                }
            }
        };

        resumeCountdown(); // 组件初始化时恢复倒计时

        // 监听设备类型变化
        const toggleDevice = (value: DeviceType) => {
            device.value = value;
        }

        const isPc = computed(() => device.value === 'pc')

        const menuList = ref<IHome.MenuRow[]>([])

        const setMenuList = (menu: IHome.MenuRow[]) => {
            menuList.value = menu
        }

        return {
            codeCountDown,
            startCodeCountDown,
            resumeCountdown,
            lastStartTime,
            device,
            toggleDevice,
            isPc,
            menuList,
            setMenuList
        };
    },
    {
        persist: piniaPersistConfig('app')
    }
);
