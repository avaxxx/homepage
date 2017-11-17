import { BaseViewModel } from './../../../../common/BaseViewModel';
import { I18N } from 'aurelia-i18n';
import { autoinject } from 'aurelia-framework';
import { UserManager } from 'oidc-client'
import * as Enviroment from 'environment'

@autoinject
export class Home extends BaseViewModel {
    styleAsString : string;
    styleAsObject : object; 
    text: string;
    appName: string;

    constructor(private i18n: I18N){
        super();
        this.appName =Enviroment.default.appName;
    }

    async attached() {
        let user = await this.userPromise;
        this.logger.info(user.access_token);  
    }


}
