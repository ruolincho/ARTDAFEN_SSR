export namespace IPay {
    export interface Query {
        /*订单编号, 创建订单返回的订单编号*/
        tradeNo: string
        /*支付渠道*/
        payChannelStr: Dict.PayChannelStr
        /*订单类型*/
        orderType: Dict.OrderType
        /*支付成功重定向地址, url默认拼接orderId=xxx*/
        returnUrl?: string
        /*由微信生成的应用ID, 微信租户ID, 发起微信支付必传*/
        appId?: string
        /*用户网页授权获取的openId, 发起微信 JsApi 支付必传	*/
        openId?: string
    }

    /*支付回调参数*/
    export interface CallbackQuery {
        orderId: string
    }

    /*支付回调结果*/
    export interface CallbackRow {
        "debug_id": string;
        "id": string;
        "payment_source": {
            "paypal": {
                "email_address": string;
                "account_id": string;
                "account_status": string;
                "name": {
                    "given_name": string;
                    "surname": string
                };
                "address": {
                    "country_code": string
                }
            }
        };
        "payer": {
            "email_address": string;
            "payer_id": string;
            "name": {
                "given_name": string;
                "surname": string
            };
            "address": {
                "country_code": string
            }
        };
        "purchase_units": {
            "reference_id": string;
            "shipping": {
                "name": {
                    "full_name": string
                };
                "address": {
                    "address_line_1": string;
                    "admin_area_2": string;
                    "admin_area_1": string;
                    "postal_code": string;
                    "country_code": string
                }
            };
            "payments": {
                "captures":  {
                    "status": string;
                    "id": string;
                    "amount": {
                        "currency_code": string;
                        "value": string
                    };
                    "custom_id": string;
                    "seller_protection": {
                        "status": string;
                        "dispute_categories": string[]
                    };
                    "final_capture": boolean;
                    "seller_receivable_breakdown": {
                        "gross_amount": {
                            "currency_code": string;
                            "value": string
                        };
                        "paypal_fee": {
                            "currency_code": string;
                            "value": string
                        };
                        "net_amount": {
                            "currency_code": string;
                            "value": string
                        }
                    };
                    "disbursement_mode": string;
                    "links": {
                        "href": string;
                        "rel": string;
                        "method": string
                    }[];
                    "create_time": string;
                    "update_time": string
                }[];
                "authorizations":  {
                    "status": string;
                    "id": string;
                    "amount": {
                        "currency_code": string;
                        "value": string
                    };
                    "custom_id": string;
                    "seller_protection": {
                        "status": string;
                        "dispute_categories": string[]
                    };
                    "final_capture": boolean;
                    "seller_receivable_breakdown": {
                        "gross_amount": {
                            "currency_code": string;
                            "value": string
                        };
                        "paypal_fee": {
                            "currency_code": string;
                            "value": string
                        };
                        "net_amount": {
                            "currency_code": string;
                            "value": string
                        }
                    };
                    "disbursement_mode": string;
                    "links": {
                        "href": string;
                        "rel": string;
                        "method": string
                    }[];
                    "create_time": string;
                    "update_time": string
                }[]
            }
        }[];
        "status": string;
        "links": {
            "href": string;
            "rel": string;
            "method": string
        }[]
        "details": {
            "issue": string;
            "description": string;
        }[]
    }


}