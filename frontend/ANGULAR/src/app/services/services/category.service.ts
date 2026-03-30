/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CategoryResponse } from '../models/category-response';
import { getCategories } from '../fn/category/get-categories';
import { GetCategories$Params } from '../fn/category/get-categories';
import { getCategoriesByPillar } from '../fn/category/get-categories-by-pillar';
import { GetCategoriesByPillar$Params } from '../fn/category/get-categories-by-pillar';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCategoriesByPillar()` */
  static readonly GetCategoriesByPillarPath = '/categoriesbypillar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategoriesByPillar()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoriesByPillar$Response(params: GetCategoriesByPillar$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryResponse>>> {
    return getCategoriesByPillar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCategoriesByPillar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoriesByPillar(params: GetCategoriesByPillar$Params, context?: HttpContext): Observable<Array<CategoryResponse>> {
    return this.getCategoriesByPillar$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryResponse>>): Array<CategoryResponse> => r.body)
    );
  }

  /** Path part for operation `getCategories()` */
  static readonly GetCategoriesPath = '/allcategories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories$Response(params?: GetCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryResponse>>> {
    return getCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories(params?: GetCategories$Params, context?: HttpContext): Observable<Array<CategoryResponse>> {
    return this.getCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryResponse>>): Array<CategoryResponse> => r.body)
    );
  }

}
