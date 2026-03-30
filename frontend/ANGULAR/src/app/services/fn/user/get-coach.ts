/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageCoachResponse } from '../../models/page-coach-response';

export interface GetCoach$Params {
  page?: number;
  size?: number;
}

export function getCoach(http: HttpClient, rootUrl: string, params?: GetCoach$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCoachResponse>> {
  const rb = new RequestBuilder(rootUrl, getCoach.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageCoachResponse>;
    })
  );
}

getCoach.PATH = '/coachinfo';
