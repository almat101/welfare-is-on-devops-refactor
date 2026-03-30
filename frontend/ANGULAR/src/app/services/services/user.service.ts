/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getCoach } from '../fn/user/get-coach';
import { GetCoach$Params } from '../fn/user/get-coach';
import { getUser } from '../fn/user/get-user';
import { GetUser$Params } from '../fn/user/get-user';
import { PageCoachResponse } from '../models/page-coach-response';
import { updateLocation } from '../fn/user/update-location';
import { UpdateLocation$Params } from '../fn/user/update-location';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateLocation()` */
  static readonly UpdateLocationPath = '/location';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLocation()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateLocation$Response(params: UpdateLocation$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateLocation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLocation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateLocation(params: UpdateLocation$Params, context?: HttpContext): Observable<void> {
    return this.updateLocation$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getUser()` */
  static readonly GetUserPath = '/userinfo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser$Response(params?: GetUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return getUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser(params?: GetUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.getUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `getCoach()` */
  static readonly GetCoachPath = '/coachinfo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCoach()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCoach$Response(params?: GetCoach$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCoachResponse>> {
    return getCoach(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCoach$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCoach(params?: GetCoach$Params, context?: HttpContext): Observable<PageCoachResponse> {
    return this.getCoach$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCoachResponse>): PageCoachResponse => r.body)
    );
  }

}
