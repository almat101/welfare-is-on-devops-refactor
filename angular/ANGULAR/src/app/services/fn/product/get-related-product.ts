/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageProductResponse } from '../../models/page-product-response';

export interface GetRelatedProduct$Params {
  'product-id': number;
  page?: number;
  size?: number;
}

export function getRelatedProduct(http: HttpClient, rootUrl: string, params: GetRelatedProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
  const rb = new RequestBuilder(rootUrl, getRelatedProduct.PATH, 'get');
  if (params) {
    rb.query('product-id', params['product-id'], {});
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

getRelatedProduct.PATH = '/product/related-product';
