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
            <a href="index.html" data-type="index-link">myApp documentation</a>
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
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad" ></span>Overview
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' : 'data-target="#xs-components-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' : 'id="xs-components-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' }>
                                        <li class="link">
                                            <a href="components/AboutPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ContactPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeedbackPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeedbackPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ImagerecPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImagerecPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MyApp.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyApp</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResultsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultsPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UtilitiesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UtilitiesPage</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' : 'data-target="#xs-injectables-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' : 'id="xs-injectables-links-module-AppModule-da8aa020347650ac04d0ea1fb935d6ac"' }>
                                        <li class="link">
                                            <a href="injectables/ModelLoaderProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ModelLoaderProvider</a>
                                        </li>
                                </ul>
                            </li>
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
                                <a href="injectables/ModelLoaderProvider.html" data-type="entity-link">ModelLoaderProvider</a>
                            </li>
                    </ul>
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
