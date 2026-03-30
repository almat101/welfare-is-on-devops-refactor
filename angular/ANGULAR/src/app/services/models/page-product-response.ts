/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { ProductResponse } from '../models/product-response';
import { SortObject } from '../models/sort-object';
export interface PageProductResponse {
  content?: Array<ProductResponse>;
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
