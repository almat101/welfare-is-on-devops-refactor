/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PersonalDataResponse } from '../../models/personal-data-response';

export interface GetPersonalData$Params {
}

export function getPersonalData(http: HttpClient, rootUrl: string, params?: GetPersonalData$Params, context?: HttpContext): Observable<StrictHttpResponse<PersonalDataResponse>> {
  const rb = new RequestBuilder(rootUrl, getPersonalData.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PersonalDataResponse>;
    })
  );
}

getPersonalData.PATH = '/personal-data';
