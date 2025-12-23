import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IActivity} from "~/api/interface/activity/activity";

/**
 * 获取折扣活动数据
 */
export const getActivityApi = () => {
    return $http().get<IActivity.ActivityRow>(TRADE_MODULE + `/activity/available`)
}