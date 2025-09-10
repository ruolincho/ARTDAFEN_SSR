export namespace IMap {
    /*获取区域请求参数*/
    export interface StateQuery {
        parentId: string
    }

    /*地区选项*/
    export interface RegionOptions {
        id: string
        name: string
        zipMatch: string[]
    }

}
