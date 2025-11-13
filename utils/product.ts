import type {IHome} from "~/api/interface/home/home";

interface PathParams {
    parentId: string;
    id: string
    name?: string
}

/**
 * 处理 MUTEX类型 参数
 */
export const process_MUTEX = (groupList: IHome.MenuRow[], query: string) => {
    let MAP = {} as IHome.MenuRow
    try {
        const {parentId, id: childId} = JSON.parse(query) as PathParams;

        // 根据 parentId 查找对应的分组
        const parentItem = groupList.find(({id}) => id === parentId);

        if (!parentItem) {
            return MAP
        }

        // 在 children 数组中查找 id 为 childId 的项
        const childItem = parentItem.children?.find(({ id, config: {referenceId}}) => id === childId || referenceId === childId);
        if (!childItem) return MAP

        MAP = childItem

    } catch (error) {
        console.error('Error parsing ARTIST parameters:', error);
    }
    return MAP
}

/**
 * 处理 Group类型 / Radio类型 参数
 * @param groupList
 * @param query
 */
export const process_GROUP_RADIO = (groupList: IHome.MenuRow[], query: string) => {
    const MAP = new Map<string, IHome.MenuRow>()
    try {
        const array = JSON.parse(query);

        array.forEach(({parentId, id: childId}: PathParams) => {
            // 根据 parentId 查找对应的分组
            const parentItem = groupList.find(({id}) => id === parentId);

            if (!parentItem) return MAP

            // 在 children 数组中查找 id 为 childId 的项
            const childItem = parentItem.children?.find(({id}) => id === childId);
            if (!childItem) return MAP

            // 将找到的子项存入 Map 中
            MAP.set(parentId, childItem);
        });
    } catch (error) {
        console.error('Error parsing GROUP or RADIO parameters:', error);
    }
    return MAP;
}

/**
 * 处理 PRICE类型 参数
 * @param groupList
 * @param query
 */
export const process_PRICE = (groupList: IHome.MenuRow[], query: string) => {
    try {
        const {parentId, id: childId} = JSON.parse(query) as PathParams;
        const parentItem = groupList.find(({id}) => id === parentId);
        if (!parentItem) return {} as IHome.MenuRow
        // 在 children 数组中查找 id 为 childId 的项
        const childItem = parentItem.children?.find(({id}) => id === childId);
        if (!childItem) return {} as IHome.MenuRow
        return childItem
    } catch (error) {
        console.error('Error parsing PRICE parameters:', error);
    }
}

/**
 * 处理 CHECKBOX类型 参数
 * @param groupList
 * @param query
 */
export const process_CHECKBOX = (groupList: IHome.MenuRow[], query: string) => {
    const MAP = new Map<string, IHome.MenuRow[]>()
    try {
        const array = JSON.parse(query) as PathParams[];

        array.forEach(({parentId, id: childId}: PathParams) => {

            // 根据 parentId 查找对应的分组
            const parentItem = groupList.find(({id}) => id === parentId);

            if (!parentItem) return MAP

            // 在 children 数组中查找 id 为 childId 的项
            const childItem = parentItem.children?.find(({id}) => id === childId);
            if (!childItem) return MAP

            // 获取当前 map 中已有的项（若无则初始化为 []）
            const existing = MAP.get(parentId) || [];

            // 避免重复添加
            if (!existing.find(({id}) => id === childId)) {
                MAP.set(parentId, [...existing, childItem]);
            }
        });
    } catch (error) {
        console.error('Error parsing CHECKBOX parameters:', error);
    }
    return MAP;
}

/**
 * 处理 COLOR类型 参数
 * @param groupList
 * @param query
 */
export const process_COLOR = (groupList: IHome.MenuRow[], query: string) => {
    let MAP = [] as IHome.MenuRow[]
    try {
        const array = JSON.parse(query) as PathParams[];

        // 根据 parentId 查找对应的分组
        const parentItem = groupList.find(({config}) => config?.type === 'COLOR');

        if (!parentItem) return MAP

        const list = parentItem.children.filter(c => array.some(l => l.id == c.id)) || [];
        MAP = list as IHome.MenuRow[];
    } catch (error) {
        console.error('Error parsing COLOR parameters:', error);
    }
    return MAP;
}

/**
 * 处理 ARTIST类型 参数
 * @param groupList
 * @param query
 */
export const process_ARTIST = (groupList: IHome.MenuRow[], query: string) => {

    let MAP = {} as IHome.MenuRow
    try {
        const {parentId, id: childId} = JSON.parse(query) as PathParams;

        // 根据 parentId 查找对应的分组
        const parentItem = groupList.find(({id}) => id === parentId);

        if (!parentItem) {
            MAP = JSON.parse(query) as IHome.MenuRow
            return MAP
        }

        // 在 children 数组中查找 id 为 childId 的项
        const childItem = parentItem.children?.find(({id, config}) => id === childId || config?.referenceId === childId);
        if (!childItem) return MAP

        MAP = childItem

    } catch (error) {
        console.error('Error parsing ARTIST parameters:', error);
    }
    return MAP
}

/**
 * 处理 BRAND类型 参数
 * @param query
 */
export const process_BRAND = (query: string) => {
    let MAP = {} as IHome.MenuRow
    try {
        MAP = JSON.parse(query) as IHome.MenuRow
    } catch (error) {
        console.error('Error parsing BRAND parameters:', error);
    }
    return MAP
}

/**
 * 处理 SORT类型 参数
 * @param groupList
 * @param query
 */
export const process_SORT = (groupList: IHome.MenuRow[], query: string) => {
    let MAP = {} as IHome.MenuRow
    try {
        const {parentId, id: childId} = JSON.parse(query) as PathParams;
        // 根据 parentId 查找对应的分组
        const parentItem = groupList.find(({id}) => id === parentId);

        if (!parentItem) {
            return MAP
        }

        // 在 children 数组中查找 id 为 childId 的项
        const childItem = parentItem.children?.find(({id}) => id === childId);
        if (!childItem) return MAP

        MAP = childItem

    } catch (error) {
        console.error('Error parsing SORT parameters:', error);
    }
    return MAP
}

/**
 * 生成路径参数 - 数组类型
 * @param source
 * @param keyName
 * @example [{"parentId":"2000600","id":"3000022"}]
 */
export const gen_path_arr = (source: IHome.MenuRow[], keyName: string) => {
    return {
        [keyName]: JSON.stringify(source.map(item => ({parentId: item.parentId, id: item.id})))
    }
}

/**
 * 生成路径参数 - 对象类型
 * @example {"parentId":"2000600","id":"3000022","name":"123"}
 * @param source
 * @param keyName
 * @param extraFields 额外字段，如：name, code, startPrice, endPrice, techniqueId, color，会在对象中添加这些字段
 *
 */
export const gen_path_obj = (source: any, keyName: string, extraFields: string[] = []) => {
    const valueObj: Record<string, any> = {parentId: source.parentId}

    // 优先获取referenceId
    valueObj.id = source.config?.referenceId || source.id

    extraFields.forEach(field => {
        if (!(field in valueObj)) {
            valueObj[field] = source[field as keyof IHome.MenuRow]
        }
    })
    return {
        [keyName]: JSON.stringify(valueObj)
    }
}