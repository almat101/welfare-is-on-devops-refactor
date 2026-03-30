/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { registerSale } from '../fn/sale/register-sale';
import { RegisterSale$Params } from '../fn/sale/register-sale';
import { SaleResponse } from '../models/sale-response';

@Injectable({ providedIn: 'root' })
export class SaleService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerSale()` */
  static readonly RegisterSalePath = '/sale';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerSale()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerSale$Response(params: RegisterSale$Params, context?: HttpContext): Observable<StrictHttpResponse<SaleResponse>> {
    return registerSale(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerSale$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerSale(params: RegisterSale$Params, context?: HttpContext): Observable<SaleResponse> {
    return this.registerSale$Response(params, context).pipe(
      map((r: StrictHttpResponse<SaleResponse>): SaleResponse => r.body)
    );
  }

}
