import { BaseViewModel } from './../../../../common/BaseViewModel';
import { I18N } from 'aurelia-i18n';
import { autoinject } from 'aurelia-framework';
import { UserManager } from 'oidc-client'



@autoinject
export class Home extends BaseViewModel {
    styleAsString : string;
    styleAsObject : object; 
    text: string;
    
    constructor(private i18n: I18N){
        super();
    }

    async attached() {
        let user = await this.userPromise;
        this.logger.info(user.access_token);  
    }


}
