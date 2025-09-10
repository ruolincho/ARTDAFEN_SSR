export namespace IMine {
    /*用户基础数返回*/
    export interface UserInfoRow {
        /*用户ID*/
        id: string
        /*昵称*/
        nickname: string
        /*头像*/
        avatar: string
        /*简介*/
        intro: string
        /*性别*/
        gender: Dict.GenderStatus
        /*加密钱包地址*/
        address?: string
        /*是否实名认证*/
        certify: boolean
        /*邮箱*/
        email?: string
        /*生日*/
        birthday?: string
        /*角色类型*/
        role: Dict.RoleStatus
        /*背景*/
        background: string
        /*是否订阅*/
        subscribe: Dict.SubscribeType
    }

    /*修改个人信息参数*/
    export interface ModifyQuery {
        intro?: string
        nickname?: string
    }

}
