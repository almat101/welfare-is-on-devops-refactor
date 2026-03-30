'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">leonardo-hug-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ApiModule-f809e494ee26bc6ec10e374eec2d5f84d07c2bcc460ad5c17bd09a733cac820b53f7230106067c53bddc2c7098daaf69771535503764bef5a3cdf640d419468d"' : 'data-bs-target="#xs-injectables-links-module-ApiModule-f809e494ee26bc6ec10e374eec2d5f84d07c2bcc460ad5c17bd09a733cac820b53f7230106067c53bddc2c7098daaf69771535503764bef5a3cdf640d419468d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-f809e494ee26bc6ec10e374eec2d5f84d07c2bcc460ad5c17bd09a733cac820b53f7230106067c53bddc2c7098daaf69771535503764bef5a3cdf640d419468d"' :
                                        'id="xs-injectables-links-module-ApiModule-f809e494ee26bc6ec10e374eec2d5f84d07c2bcc460ad5c17bd09a733cac820b53f7230106067c53bddc2c7098daaf69771535503764bef5a3cdf640d419468d"' }>
                                        <li class="link">
                                            <a href="injectables/ApiConfiguration.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiConfiguration</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GymService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GymService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InteractionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InteractionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersonalDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PillarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PillarService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SaleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ActivateAccountComponent.html" data-type="entity-link" >ActivateAccountComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoriesComponent.html" data-type="entity-link" >CategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FavouritesComponent.html" data-type="entity-link" >FavouritesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GymComponent.html" data-type="entity-link" >GymComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PersonalDataComponent.html" data-type="entity-link" >PersonalDataComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PillarsComponent.html" data-type="entity-link" >PillarsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PreviewComponent.html" data-type="entity-link" >PreviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductComponent.html" data-type="entity-link" >ProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterComponent.html" data-type="entity-link" >RegisterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent.html" data-type="entity-link" >SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TokenCaptureComponent.html" data-type="entity-link" >TokenCaptureComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserDropdownComponent.html" data-type="entity-link" >UserDropdownComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WelfareCoachComponent.html" data-type="entity-link" >WelfareCoachComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/HeaderParameter.html" data-type="entity-link" >HeaderParameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Parameter.html" data-type="entity-link" >Parameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterCodec.html" data-type="entity-link" >ParameterCodec</a>
                            </li>
                            <li class="link">
                                <a href="classes/PathParameter.html" data-type="entity-link" >PathParameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryParameter.html" data-type="entity-link" >QueryParameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestBuilder.html" data-type="entity-link" >RequestBuilder</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BaseService.html" data-type="entity-link" >BaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeolocationService.html" data-type="entity-link" >GeolocationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserInfoService.html" data-type="entity-link" >UserInfoService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiConfigurationParams.html" data-type="entity-link" >ApiConfigurationParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Authenticate$Params.html" data-type="entity-link" >Authenticate$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthenticationRequest.html" data-type="entity-link" >AuthenticationRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthenticationResponse.html" data-type="entity-link" >AuthenticationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryResponse.html" data-type="entity-link" >CategoryResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CoachResponse.html" data-type="entity-link" >CoachResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Confirm$Params.html" data-type="entity-link" >Confirm$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCategories$Params.html" data-type="entity-link" >GetCategories$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCategories$Params-1.html" data-type="entity-link" >GetCategories$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCategoriesByPillar$Params.html" data-type="entity-link" >GetCategoriesByPillar$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCategoriesByPillar$Params-1.html" data-type="entity-link" >GetCategoriesByPillar$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCoach$Params.html" data-type="entity-link" >GetCoach$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetDiscount$Params.html" data-type="entity-link" >GetDiscount$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetFavorites$Params.html" data-type="entity-link" >GetFavorites$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetNearestGym$Params.html" data-type="entity-link" >GetNearestGym$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetNewArrival$Params.html" data-type="entity-link" >GetNewArrival$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPersonalData$Params.html" data-type="entity-link" >GetPersonalData$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPillar$Params.html" data-type="entity-link" >GetPillar$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPillar$Params-1.html" data-type="entity-link" >GetPillar$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPopular$Params.html" data-type="entity-link" >GetPopular$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetProduct$Params.html" data-type="entity-link" >GetProduct$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetRandomProduct$Params.html" data-type="entity-link" >GetRandomProduct$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetRelatedProduct$Params.html" data-type="entity-link" >GetRelatedProduct$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetTopSelling$Params.html" data-type="entity-link" >GetTopSelling$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetUser$Params.html" data-type="entity-link" >GetUser$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GymResponse.html" data-type="entity-link" >GymResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InteractionRequest.html" data-type="entity-link" >InteractionRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Like$Params.html" data-type="entity-link" >Like$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageableObject.html" data-type="entity-link" >PageableObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageCoachResponse.html" data-type="entity-link" >PageCoachResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageProductResponse.html" data-type="entity-link" >PageProductResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParameterOptions.html" data-type="entity-link" >ParameterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonalDataRequest.html" data-type="entity-link" >PersonalDataRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonalDataResponse.html" data-type="entity-link" >PersonalDataResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PillarResponse.html" data-type="entity-link" >PillarResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductResponse.html" data-type="entity-link" >ProductResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Register$Params.html" data-type="entity-link" >Register$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterSale$Params.html" data-type="entity-link" >RegisterSale$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationRequest.html" data-type="entity-link" >RegistrationRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SaleRequest.html" data-type="entity-link" >SaleRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SaleResponse.html" data-type="entity-link" >SaleResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SaveInteraction$Params.html" data-type="entity-link" >SaveInteraction$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavePersonalData$Params.html" data-type="entity-link" >SavePersonalData$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortObject.html" data-type="entity-link" >SortObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateLocation$Params.html" data-type="entity-link" >UpdateLocation$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});