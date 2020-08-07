export interface RequestParamsList {
  page?: number;
  per_page?: number;
  fields?: string;
  order?: string;
  order_by?: string;
}

export interface RequestParamsGet {
  id: number;
}

export interface RequestParamsPost {
  id: number;
}

export interface RequestParamsPatch {
  id: number;
}

export interface RequestParamsDelete {
  id: number;
}

export interface QueryParams {
  p?: number;
  per_page?: number;
}
