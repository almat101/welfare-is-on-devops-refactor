/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getPillar } from '../fn/pillar/get-pillar';
import { GetPillar$Params } from '../fn/pillar/get-pillar';
import { PillarResponse } from '../models/pillar-response';

@Injectable({ providedIn: 'root' })
export class PillarService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getPillar()` */
  static readonly GetPillarPath = '/pillar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPillar()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPillar$Response(params?: GetPillar$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PillarResponse>>> {
    return getPillar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPillar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPillar(params?: GetPillar$Params, context?: HttpContext): Observable<Array<PillarResponse>> {
    return this.getPillar$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PillarResponse>>): Array<PillarResponse> => r.body)
    );
  }

}
