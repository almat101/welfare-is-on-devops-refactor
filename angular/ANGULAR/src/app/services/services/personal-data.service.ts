/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getPersonalData } from '../fn/personal-data/get-personal-data';
import { GetPersonalData$Params } from '../fn/personal-data/get-personal-data';
import { PersonalDataResponse } from '../models/personal-data-response';
import { savePersonalData } from '../fn/personal-data/save-personal-data';
import { SavePersonalData$Params } from '../fn/personal-data/save-personal-data';

@Injectable({ providedIn: 'root' })
export class PersonalDataService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getPersonalData()` */
  static readonly GetPersonalDataPath = '/personal-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPersonalData()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPersonalData$Response(params?: GetPersonalData$Params, context?: HttpContext): Observable<StrictHttpResponse<PersonalDataResponse>> {
    return getPersonalData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPersonalData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPersonalData(params?: GetPersonalData$Params, context?: HttpContext): Observable<PersonalDataResponse> {
    return this.getPersonalData$Response(params, context).pipe(
      map((r: StrictHttpResponse<PersonalDataResponse>): PersonalDataResponse => r.body)
    );
  }

  /** Path part for operation `savePersonalData()` */
  static readonly SavePersonalDataPath = '/personal-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePersonalData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePersonalData$Response(params: SavePersonalData$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return savePersonalData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePersonalData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePersonalData(params: SavePersonalData$Params, context?: HttpContext): Observable<number> {
    return this.savePersonalData$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
