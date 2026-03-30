/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getFavorites } from '../fn/interaction/get-favorites';
import { GetFavorites$Params } from '../fn/interaction/get-favorites';
import { like } from '../fn/interaction/like';
import { Like$Params } from '../fn/interaction/like';
import { PageProductResponse } from '../models/page-product-response';
import { saveInteraction } from '../fn/interaction/save-interaction';
import { SaveInteraction$Params } from '../fn/interaction/save-interaction';

@Injectable({ providedIn: 'root' })
export class InteractionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveInteraction()` */
  static readonly SaveInteractionPath = '/interaction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInteraction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInteraction$Response(params: SaveInteraction$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return saveInteraction(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveInteraction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInteraction(params: SaveInteraction$Params, context?: HttpContext): Observable<void> {
    return this.saveInteraction$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `like()` */
  static readonly LikePath = '/interaction/favorite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `like()` instead.
   *
   * This method doesn't expect any request body.
   */
  like$Response(params: Like$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return like(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `like$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  like(params: Like$Params, context?: HttpContext): Observable<number> {
    return this.like$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getFavorites()` */
  static readonly GetFavoritesPath = '/interaction/myfavorites';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFavorites()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFavorites$Response(params?: GetFavorites$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProductResponse>> {
    return getFavorites(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFavorites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFavorites(params?: GetFavorites$Params, context?: HttpContext): Observable<PageProductResponse> {
    return this.getFavorites$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProductResponse>): PageProductResponse => r.body)
    );
  }

}
