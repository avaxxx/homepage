import { autoinject } from "aurelia-framework";
import { Redirect } from "aurelia-router";

@autoinject
export class Signin
{
    constructor()
    {

    }

    canActivate(param) {
        if (param.id == null)
            return new Redirect('/home')
    }
}