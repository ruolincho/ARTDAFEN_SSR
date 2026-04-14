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

        // AppHeader组件逻辑：
        const headerState = reactive({
            height: 0, // 用来存储头部高度
            isFold: false,   // 当前是否折叠
            isLocked: false, // 是否被锁定（锁定期间忽略滚动）
            duration: 300 // 对应 CSS transition
        })

        // 设置头部高度的方法
        const setHeaderHeight = (val: number) => {
            headerState.height = val;
        }

        // 组件监听到滚动时调用此方法。如果处于锁定状态，则忽略更新
        const setScrollFold = (shouldFold: boolean)=> {
            if (!headerState.isLocked) {
                headerState.isFold = shouldFold;
            }
        }

        // 外部业务调用：强制折叠（开始引导）。返回 Promise，等待 320ms 动画结束
        const forceFoldHeader = () => {
            return new Promise<void>((resolve) => {
                if (!isPc.value) return resolve();
                headerState.isLocked = true; // 上锁
                headerState.isFold = true;   // 强制折叠

                setTimeout(() => {
                    resolve();
                }, headerState.duration);
            });
        }

        // 外部业务调用：取消强制折叠（结束引导）。解锁后，组件会监听到 isLocked 变化并自动校准状态
        const cancelForceFoldHeader = () => {
            if (!isPc.value) return;
            headerState.isLocked = false;
        }

        return {
            codeCountDown,
            startCodeCountDown,
            resumeCountdown,
            lastStartTime,
            device,
            toggleDevice,
            isPc,
            // AppHeader组件逻辑：
            headerState,
            setHeaderHeight,
            setScrollFold,
            forceFoldHeader,
            cancelForceFoldHeader,
            menuList,
            setMenuList
        };
    },
    {
        persist: piniaPersistConfig('app')
    }
);
