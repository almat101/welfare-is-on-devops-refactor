/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getNearestGym } from '../fn/gym/get-nearest-gym';
import { GetNearestGym$Params } from '../fn/gym/get-nearest-gym';
import { GymResponse } from '../models/gym-response';

@Injectable({ providedIn: 'root' })
export class GymService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getNearestGym()` */
  static readonly GetNearestGymPath = '/gym/nearest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNearestGym()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNearestGym$Response(params?: GetNearestGym$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GymResponse>>> {
    return getNearestGym(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNearestGym$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNearestGym(params?: GetNearestGym$Params, context?: HttpContext): Observable<Array<GymResponse>> {
    return this.getNearestGym$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GymResponse>>): Array<GymResponse> => r.body)
    );
  }

}
