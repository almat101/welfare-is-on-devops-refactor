/* tslint:disable */
/* eslint-disable */
import { CoachResponse } from '../models/coach-response';
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
export interface PageCoachResponse {
  content?: Array<CoachResponse>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
