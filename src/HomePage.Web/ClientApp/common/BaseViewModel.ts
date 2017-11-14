import { MainLogger } from './MainLogger';
import { NavigationInstruction, RouteConfig } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { UserManager } from "oidc-client";
import { Logger } from 'aurelia-logging'
import { ColorAppender } from 'aurelia-logging-color'
declare const IS_DEV_BUILD: boolean;
import {Container} from 'aurelia-framework';

//https://ilikekillnerds.com/2016/11/injection-inheritance-aurelia/
export class BaseViewModel{

    public user : Oidc.User;
    public userPromise: Promise<Oidc.User>;
    private userManager: UserManager;
    protected logger: Logger;

    constructor()
    {
        this.logger = MainLogger.getLogger('baseviewmodel');
        
        this.userManager = Container.instance.get(UserManager);
        // addAppender(new ColorAppender()); 
        
        this.logger.info("Test info");

        this.userPromise = this.userManager.getUser();

        this.userManager.getUser().then((user) => {
            this.user = user;
        });
    }

    // This method gets called when the View is attached to the DOM. Here is where you will do your DOM manipulation, 
    // wrap elements in jQuery objects or whatever you like. All work with the DOM (especially plugins) should be done within this method.
    attached(){
        this.logger.info('attached');
    }
    // This method is called when the View is detached from the DOM. If you registered events in the attached method, 
    // you would probably unbind them in here. This is your chance to free up some memory and clean the slate.
    detached()
    {
        this.logger.info('detached');
    }
    // This method happens after binding occurs, but before the DOM attachment. This is where the DataBinding engine binds the contents of the View.
    bind()
    {
        this.logger.info('bind');
    }
    // This method is called when the DataBinding engine is unbound from the View.
    unbind()
    {
        this.logger.info('unbind');
    }


    //1. The target route is identified. If no route matches the new path, an error is thrown and the process stops here.
    //2. A chance is given to the active route component to refuse deactivation, in which case the router restores the previous URL and stops the process here.
    //3. A chance is given to the target route component to refuse activation, in which case the router restores the previous URL and stops the process here.
    //4. The active route component is deactivated.
    //5. The target route component is activated.
    //6. The views are swapped.

    // Called at step #2 to know if the component can be activated. Can return a boolean value, 
    // a Promise of a boolean value, a navigation command, or a Promise of a navigation command.
    canActivate(params: any, routerConfig: RouteConfig, navigationInstruction: NavigationInstruction)
    {
        this.logger.info('canActivate');
    }

    // Called at step #5, when the component gets activated. Can optionally return a Promise.
    activate(params: any, routerConfig: RouteConfig, navigationInstruction: NavigationInstruction)
    {
        this.logger.info('activate');
    }

    // Called at step #3 to know if the component can be deactivated. Can return a boolean value, 
    // a Promise of a boolean value, a navigation command, or a Promise of a navigation command.
    canDeactivate()
    {
        this.logger.info('canDeactivate');
    }

    //Called at step #4, when the component gets deactivated. Can optionally return a Promise.
    deactivate()
    {
        this.logger.info('deactivate');
    }
}