/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { SaleService } from './services/sale.service';
import { PersonalDataService } from './services/personal-data.service';
import { UserService } from './services/user.service';
import { InteractionService } from './services/interaction.service';
import { AuthenticationService } from './services/authentication.service';
import { ProductService } from './services/product.service';
import { PillarService } from './services/pillar.service';
import { GymService } from './services/gym.service';
import { CategoryService } from './services/category.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    SaleService,
    PersonalDataService,
    UserService,
    InteractionService,
    AuthenticationService,
    ProductService,
    PillarService,
    GymService,
    CategoryService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
