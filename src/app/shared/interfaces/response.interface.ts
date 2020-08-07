export interface APIResponse {
  success: boolean;
  message: string;
  data: any;
}
export interface APIResponsePagination {
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
  data?: any;
}
