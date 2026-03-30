/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageProductResponse } from '../../models/page-product-response';

export interface GetTopSelling$Params {
  category: string;
  page?: number;
  size?: number;
}

export function getTopSelling(http: HttpClient, rootUrl: string, params: GetTopSelling$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
  const rb = new RequestBuilder(rootUrl, getTopSelling.PATH, 'get');
  if (params) {
    rb.path('category', params.category, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageProductResponse>;
    })
  );
}

getTopSelling.PATH = '/product/{category}/top-selling';
