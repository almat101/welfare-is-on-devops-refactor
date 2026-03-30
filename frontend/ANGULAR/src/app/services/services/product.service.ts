/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getDiscount } from '../fn/product/get-discount';
import { GetDiscount$Params } from '../fn/product/get-discount';
import { getNewArrival } from '../fn/product/get-new-arrival';
import { GetNewArrival$Params } from '../fn/product/get-new-arrival';
import { getPopular } from '../fn/product/get-popular';
import { GetPopular$Params } from '../fn/product/get-popular';
import { getProduct } from '../fn/product/get-product';
import { GetProduct$Params } from '../fn/product/get-product';
import { getRandomProduct } from '../fn/product/get-random-product';
import { GetRandomProduct$Params } from '../fn/product/get-random-product';
import { getRelatedProduct } from '../fn/product/get-related-product';
import { GetRelatedProduct$Params } from '../fn/product/get-related-product';
import { getTopSelling } from '../fn/product/get-top-selling';
import { GetTopSelling$Params } from '../fn/product/get-top-selling';
import { PageProductResponse } from '../models/page-product-response';
import { ProductResponse } from '../models/product-response';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProduct()` */
  static readonly GetProductPath = '/product/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProduct$Response(params: GetProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return getProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProduct(params: GetProduct$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.getProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `getTopSelling()` */
  static readonly GetTopSellingPath = '/product/{category}/top-selling';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopSelling()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopSelling$Response(params: GetTopSelling$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
    return getTopSelling(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTopSelling$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopSelling(params: GetTopSelling$Params, context?: HttpContext): Observable<PageProductResponse> {
    return this.getTopSelling$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProductResponse>): PageProductResponse => r.body)
    );
  }

  /** Path part for operation `getRandomProduct()` */
  static readonly GetRandomProductPath = '/product/{category}/random';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRandomProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRandomProduct$Response(params: GetRandomProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
    return getRandomProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRandomProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRandomProduct(params: GetRandomProduct$Params, context?: HttpContext): Observable<PageProductResponse> {
    return this.getRandomProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProductResponse>): PageProductResponse => r.body)
    );
  }

  /** Path part for operation `getPopular()` */
  static readonly GetPopularPath = '/product/{category}/popular';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPopular()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPopular$Response(params: GetPopular$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
    return getPopular(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPopular$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPopular(params: GetPopular$Params, context?: HttpContext): Observable<PageProductResponse> {
    return this.getPopular$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProductResponse>): PageProductResponse => r.body)
    );
  }

  /** Path part for operation `getNewArrival()` */
  static readonly GetNewArrivalPath = '/product/{category}/new';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNewArrival()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNewArrival$Response(params: GetNewArrival$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
    return getNewArrival(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNewArrival$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNewArrival(params: GetNewArrival$Params, context?: HttpContext): Observable<PageProductResponse> {
    return this.getNewArrival$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProductResponse>): PageProductResponse => r.body)
    );
  }

  /** Path part for operation `getDiscount()` */
  static readonly GetDiscountPath = '/product/{category}/discount';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscount$Response(params: GetDiscount$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
    return getDiscount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDiscount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscount(params: GetDiscount$Params, context?: HttpContext): Observable<PageProductResponse> {
    return this.getDiscount$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProductResponse>): PageProductResponse => r.body)
    );
  }

  /** Path part for operation `getRelatedProduct()` */
  static readonly GetRelatedProductPath = '/product/related-product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRelatedProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRelatedProduct$Response(params: GetRelatedProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
    return getRelatedProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRelatedProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRelatedProduct(params: GetRelatedProduct$Params, context?: HttpContext): Observable<PageProductResponse> {
    return this.getRelatedProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProductResponse>): PageProductResponse => r.body)
    );
  }

}
