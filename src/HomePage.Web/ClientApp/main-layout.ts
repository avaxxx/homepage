import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Layout
{
    @bindable router;
    constructor(router: Router){
        console.log('layout');
        this.router = router;
        console.log(router.routes);
    }
}