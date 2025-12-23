export namespace ProList {
  export interface Pageable {
    pageNum: number;
    pageSize: number;
    total: number;
  }
  export interface StateProps {
    tableData: any[];
    pageable: Pageable;
    totalParam: {
      [key: string]: any;
    };
    icon?: {
      [key: string]: any;
    };
    loading: boolean;
    requestFinished: boolean;
  }
}

export namespace ProInfinite {
  export interface Pageable {
    pageNum: number;
    pageSize: number;
    total: number;
  }
  export interface StateProps {
    tableData: any[] | Map<any, any[]>;
    pageable: Pageable;
    totalParam: {
      [key: string]: any;
    };
    icon?: {
      [key: string]: any;
    };
    loading: boolean;
    loaded: boolean;
    requestFinished: boolean;
  }
}

export namespace HandleData {
  export type MessageType = '' | 'success' | 'warning' | 'info' | 'error';
}

export namespace Seo {
  export interface Props {
    title: string
    description: string
    keywords?: string
    ogImage?: string
    ogUrl?: string
    ogType?: string
  }
}

export namespace JsonLd {
  /**
   * 可选项：你可以在调用时覆盖这些默认值
   */
  export interface ProductJsonLdOptions {
    siteUrl?: string                       // 站点根域名（用于拼 canonical / 变体URL）
    countryCodes?: string[]            // 可配送国家（ISO 3166-1 alpha-2）
    handlingDays?: { min: number; max: number }
    transitDays?: { min: number; max: number }
    returnDays?: number                    // 退货窗口（天）
    restockingFee?: number                 // 重新上架费，百分比小数，如 0.05
    currency?: string                      // 默认币种（用于运费等需要时）
    makeVariantUrl?: (baseId: string, specs: Record<string, any>) => string // 自定义变体URL生成器
    priceValidUntilDays?: number            // 每个报价的有效天数；例如 30 => 今天+30天
    aggregateRating?: {                     // 汇总评分（有就写）
      ratingValue: number                   // 平均分（如 4.7）
      reviewCount: number                   // 评价条数
    }
    reviews?: Array<{                       // 最近几条评价（有就写）
      author: string
      ratingValue: number                   // 单条评价分
      reviewBody?: string
      datePublished?: string                // ISO 日期 '2025-09-17'
    }>
  }
}
