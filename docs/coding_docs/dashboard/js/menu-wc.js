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
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">ss-dashboard documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
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
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-439013f9bd0a960611d4765b97671ad1"' : 'data-target="#xs-components-links-module-AppModule-439013f9bd0a960611d4765b97671ad1"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-439013f9bd0a960611d4765b97671ad1"' : 'id="xs-components-links-module-AppModule-439013f9bd0a960611d4765b97671ad1"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UserProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-CoreModule-4faa9a264c8cbbb3f82138e9cefd7963"' : 'data-target="#xs-injectables-links-module-CoreModule-4faa9a264c8cbbb3f82138e9cefd7963"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-CoreModule-4faa9a264c8cbbb3f82138e9cefd7963"' : 'id="xs-injectables-links-module-CoreModule-4faa9a264c8cbbb3f82138e9cefd7963"' }>
                                        <li class="link">
                                            <a href="injectables/AlertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AlertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BackendService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>BackendService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ModelsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ModelsService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UiModule.html" data-type="entity-link">UiModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UiModule-9ee52bc61f19991e43a138b44f1f4486"' : 'data-target="#xs-components-links-module-UiModule-9ee52bc61f19991e43a138b44f1f4486"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UiModule-9ee52bc61f19991e43a138b44f1f4486"' : 'id="xs-components-links-module-UiModule-9ee52bc61f19991e43a138b44f1f4486"' }>
                                        <li class="link">
                                            <a href="components/AlertComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ComingSoonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComingSoonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashHeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashModelsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashModelsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashModelsCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashModelsCreateComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashModelsEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashModelsEditComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashOverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashOverviewComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashSideNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashSideNavComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashTrainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashTrainComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FlamesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FlamesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ParticleBackgroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParticleBackgroundComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SideNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SideNavComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/Alert.html" data-type="entity-link">Alert</a>
                    </li>
                    <li class="link">
                        <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                    </li>
                    <li class="link">
                        <a href="classes/Model.html" data-type="entity-link">Model</a>
                    </li>
                    <li class="link">
                        <a href="classes/ParticleSystem.html" data-type="entity-link">ParticleSystem</a>
                    </li>
                    <li class="link">
                        <a href="classes/User.html" data-type="entity-link">User</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AlertService.html" data-type="entity-link">AlertService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/BackendService.html" data-type="entity-link">BackendService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ModelsService.html" data-type="entity-link">ModelsService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/ConfirmationResponse.html" data-type="entity-link">ConfirmationResponse</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TrainingRequest.html" data-type="entity-link">TrainingRequest</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
