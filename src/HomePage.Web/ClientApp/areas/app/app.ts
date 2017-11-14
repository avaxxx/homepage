import { getLogger, Logger } from 'aurelia-logging';
import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, NavigationInstruction  } from 'aurelia-router';
import {AuthenticateStep} from 'aurelia-authentication';
import { UserManager, Log } from 'oidc-client'
import NavigationStrategies from '../../auth/navigation-strategies'
import OpenIdConnectAuthorizeStep from '../../auth/authorize-step'
import OpenIdConnectConfiguration from '../../auth/open-id-connect-configuration'
import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { MainLogger } from 'common/MainLogger';

@autoinject
export class App {
    router: Router;
    mgr: UserManager;
    logger: Logger;
    subscription: Subscription;

    constructor
        (
                private openIdConnectNavigationStrategies: NavigationStrategies,
                private openIdConnect: OpenIdConnect,
                private eventAggregator: EventAggregator
                
        ){
            this.openIdConnect.logger.enableLogging(Log.INFO);
            this.logger = MainLogger.getLogger('routing');
        // var config = {
        //     authority: "http://localhost:5000",
        //     client_id: "js",
        //     redirect_uri: "http://localhost:5000/#home/",
        //     response_type: "id_token token",
        //     scope:"openid profile api1",
        //     post_logout_redirect_uri : "http://localhost:5003/index.html",
        // };


        // this.mgr = new UserManager(config);
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.options.pushState = true;
        
        config.addPipelineStep("authorize", OpenIdConnectAuthorizeStep);

        // const { attributes } = require("aurelia-webpack-plugin/dist/html-requires-loader");
        // attributes["router-view"] = [ "layout-view", "layout-view-model" ];

        let step = {
            run: (navigationInstruction, next) => {
              this.logger.debug("pre-act for" + navigationInstruction.config.moduleId);
              return next();
            }
          };
          config.addPreActivateStep(step);

          config.mapUnknownRoutes((instruction) => {
            let path = instruction.fragment.toLowerCase();
            return PLATFORM.moduleName("../../resources/components/not-found/not-found");
          });

        // config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter so only authenticated uses are authorized to access some routes
        
        config.map([{
            route: [ '', 'home' ],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: PLATFORM.moduleName('./components/home/home'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'Home'
        }, 
          
          
        {
            name: "login",
            nav: false,
            navigationStrategy: (instruction) => {
                instruction.config.href = instruction.fragment;
                instruction.config.moduleId = instruction.fragment;
                instruction.config.redirect = instruction.fragment;
                this.openIdConnect.login();
            },
            route: "login",
            settings: {
                roles: [OpenIdConnectRoles.Anonymous]
            },
        },
        {
            name: "logInRedirectCallback",
            navigationStrategy: (instruction: NavigationInstruction) => {
                if (this.isSilentLogin()) {
                    return this.openIdConnectNavigationStrategies.silentSignICallback(instruction);
                } else {
                    return this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction, router);
                }
            },
            //route: this.getPath(OpenIdConnectConfiguration.userManagerSettings.redirect_uri),
            route: 'singin-success',
        }]);
     
        this.router = router;


    }


    
    private isSilentLogin(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    private getPath(uri: string): string {
        return this.convertUriToAnchor(uri).pathname;
    };

    private convertUriToAnchor(uri: string): HTMLAnchorElement {
        let anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = uri;
        return anchor;
    }
}