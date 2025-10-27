import mitt from 'mitt';

export type MittEvents = {
    closeCartWindow: void;
    openCartWindow: void;
    loginSuccess: void;
    continueCustomPaint: void;
};

export default defineNuxtPlugin((_nuxtApp) => {
    const mittBus = mitt<MittEvents>();
    return { provide: { bus: mittBus } }
})
