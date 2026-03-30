/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SaleRequest } from '../../models/sale-request';
import { SaleResponse } from '../../models/sale-response';

export interface RegisterSale$Params {
      body: SaleRequest
}

export function registerSale(http: HttpClient, rootUrl: string, params: RegisterSale$Params, context?: HttpContext): Observable<StrictHttpResponse<SaleResponse>> {
  const rb = new RequestBuilder(rootUrl, registerSale.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SaleResponse>;
    })
  );
}

registerSale.PATH = '/sale';
