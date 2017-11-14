import { autoinject } from "aurelia-framework";
import { Redirect, NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import {OpenIdConnectRoles} from 'aurelia-open-id-connect';

@autoinject
export default class OpenIdConnectAuthorizeStep {

    constructor(private userManager: UserManager) { }

    public run(navigationInstruction: NavigationInstruction, next: any): Promise<any> {

        return this.userManager.getUser().then((user) => {

            if (this.requiresRole(navigationInstruction, OpenIdConnectRoles.Authorized)) {
                if (user === null) {
                    return next.cancel(new Redirect("login"));
                }
            }

            if (this.requiresRole(navigationInstruction, OpenIdConnectRoles.Administrator)) {
                // todo: Check for admin role.
                if (user === null)
                {
                    return next.cancel(new Redirect("login"));
                }

                if (user.profile.UserRight !== "SuperAdmin")
                {
                    return next.cancel(new Redirect("not-authorized"));
                }
            }

            return next();
        });
    }

    private requiresRole(navigationInstruction: NavigationInstruction, role: OpenIdConnectRoles): boolean {
        return navigationInstruction.getAllInstructions().some((instruction) => {
            return instruction.config.settings !== undefined && instruction.config.settings.roles !== undefined &&
                instruction.config.settings.roles.indexOf(role) >= 0;
        });
    }
}