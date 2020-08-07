import { Data, Params } from '@angular/router';

export interface RouterData extends Data {
  pageClasses?: string;
}

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  data: RouterData;
}
