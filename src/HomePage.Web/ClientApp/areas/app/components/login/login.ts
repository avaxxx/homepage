import {OpenIdConnect} from 'aurelia-open-id-connect';
import { autoinject, customElement } from "aurelia-framework";


@autoinject
export class Login{
    constructor(private openIdConnect: OpenIdConnect) { }
	

	heading = 'Login';
		
	authenticate(){
		this.openIdConnect.login();

	}
}