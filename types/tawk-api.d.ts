export interface TawkVisitor {
    name?: string;
    email?: string;
    phone?: string;
    hash?: string;
    [key: string]: any;
}

export type TawkStatus = 'online' | 'away' | 'offline';
export type TawkWindowType = 'inline' | 'embed';
export type TawkCallback = (error?: any) => void;

export interface TawkTagUpdateData {
    tags: string[];
    [key: string]: any;
}

export interface TawkAgentJoinData {
    name: string;
    position?: string;
    image?: string;
    id: string;
    [key: string]: any;
}

export interface TawkAgentLeaveData {
    name: string;
    id: string;
    [key: string]: any;
}

export interface TawkPrechatData {
    name?: string;
    email?: string;
    phone?: string;
    questions?: any[];
    [key: string]: any;
}

export interface TawkOfflineSubmitData {
    name: string;
    email: string;
    message: string;
    questions?: any[];
    [key: string]: any;
}

export interface TawkChatMessage {
    message: string;
    attachment?: any;
    [key: string]: any;
}

export interface TawkAttributes {
    [key: string]: string;
}

export interface TawkSwitchWidgetData {
    propertyId: string;
    widgetId: string;
    [key: string]: any;
}

export interface Tawk_API {
    // 属性
    autoStart?: boolean;
    visitor?: TawkVisitor;
    customStyle?: { zIndex: number | string };

    // 方法
    start(options?: { showWidget?: boolean }): void;
    shutdown(): void;
    switchWidget(data: TawkSwitchWidgetData, callback?: TawkCallback): void;
    login(data: TawkVisitor & { userId: string }, callback?: TawkCallback): void;
    logout(callback?: TawkCallback): void;

    // 回调属性
    onLoad?: () => void;
    onStatusChange?: (status: TawkStatus) => void;
    onBeforeLoad?: () => void;
    onChatMaximized?: () => void;
    onChatMinimized?: () => void;
    onChatHidden?: () => void;
    onChatStarted?: () => void;
    onChatEnded?: () => void;
    onPrechatSubmit?: (data: TawkPrechatData) => void;
    onOfflineSubmit?: (data: TawkOfflineSubmitData) => void;
    onChatMessageVisitor?: (message: TawkChatMessage) => void;
    onChatMessageAgent?: (message: TawkChatMessage) => void;
    onChatMessageSystem?: (message: TawkChatMessage) => void;
    onAgentJoinChat?: (data: TawkAgentJoinData) => void;
    onAgentLeaveChat?: (data: TawkAgentLeaveData) => void;
    onChatSatisfaction?: (rating: -1 | 0 | 1) => void;
    onVisitorNameChanged?: (visitorName: string) => void;
    onFileUpload?: (link: string) => void;
    onTagsUpdated?: (data: TawkTagUpdateData) => void;

    // 控制接口
    maximize(): void;
    minimize(): void;
    toggle(): void;
    popup(): void;
    getWindowType(): TawkWindowType;
    showWidget(): void;
    hideWidget(): void;
    toggleVisibility(): void;
    getStatus(): TawkStatus;
    isChatMaximized(): boolean;
    isChatMinimized(): boolean;
    isChatHidden(): boolean;
    isChatOngoing(): boolean;
    isVisitorEngaged(): boolean;
    endChat(): void;
    setAttributes(attributes: TawkAttributes, callback?: TawkCallback): void;
    addEvent(eventName: string, metadata?: object, callback?: TawkCallback): void;
    addTags(tags: string[], callback?: TawkCallback): void;
    removeTags(tags: string[], callback?: TawkCallback): void;
}
