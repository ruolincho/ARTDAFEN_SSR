export namespace IAddress {

    /*地址数据*/
    export interface Row {
        /*收货地址编号*/
        id: string
        /*联系人姓名*/
        firstName: string
        /*联系人姓氏*/
        lastName: string
        /*联系人电话*/
        mobile: string
        /*国家*/
        country: string
        /*市*/
        city: string
        /*州*/
        state: string
        /*详细地址信息*/
        detail: string
        /*邮编*/
        zip: string
        /*是否默认*/
        defaultFlag: Dict.DefaultFlagStatus
    }
}
