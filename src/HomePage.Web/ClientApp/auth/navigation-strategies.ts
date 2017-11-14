import { autoinject } from "aurelia-framework";
import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import {OpenIdConnectConfiguration} from "aurelia-open-id-connect";
import {Router} from 'aurelia-router';


@autoinject
export default class NavigationStrategies {

    constructor(
        private openIdConnectConfiguration: OpenIdConnectConfiguration,
        private userManager: UserManager) 
        { }

    public signInRedirectCallback(instruction: NavigationInstruction, router:Router): Promise<any> {
        
        console.log('navigationstrategies')
        let callbackHandler: Function = () => {
            return this.userManager.getUser().then((user) => {
                // getUser()
                // Sign in only if we do not already have a user;
                // otherwise, we receive a 'No matching state found in storage' error,
                // on a page refresh with stale state in the window.location.
                if (user === null || user === undefined) {
                    let args: any = {};
                    return this.userManager.signinRedirectCallback(args);
                }
            });
        };

        let postCallbackRedirect: Function = () => {
         router.navigateToRoute('home');
            
            // instruction.config.moduleId = this.openIdConnectConfiguration.loginRedirectModuleId;
        };

        return this.runHandlers(callbackHandler, postCallbackRedirect);
    }

    public silentSignICallback(instruction: NavigationInstruction): Promise<any> {

        let callbackHandler: Function = () => {
            // The url must be null;
            // otherwise, IFrameWindow.notifyParent will not work,
            // And we will receive one of two errors: 
            // 'No matching state found in storage' or
            // 'No state in response'
            let url: string = null;
            return this.userManager.signinSilentCallback(url);
        };

        let postCallbackRedirect: Function = () => {
            instruction.config.moduleId = "THIS_HAPPENS_IN_A_CHILD_I_FRAME";
        };

        return this.runHandlers(callbackHandler, postCallbackRedirect);
    }

    public signoutRedirectCallback(instruction: NavigationInstruction, router:Router): Promise<any> {
        let callbackHandler: Function = () => {
            let args: any = {};
            return this.userManager.signoutRedirectCallback(args);
        };

        let postCallbackRedirect: Function = () => {
            router.navigate('home');
            // instruction.config.moduleId = this.openIdConnectConfiguration.logoutRedirectModuleId;
        };

        return this.runHandlers(callbackHandler, postCallbackRedirect);
    }

    private runHandlers(callbackHandler: Function, postCallbackRedirect: Function) {
        return callbackHandler()
            .then(() => postCallbackRedirect())
            .catch((err) => {
                postCallbackRedirect();
                throw err;
            });
    }
}