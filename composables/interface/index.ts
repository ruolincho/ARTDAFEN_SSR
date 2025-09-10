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
