import { addAppender, setLevel, getLogger, logLevel } from 'aurelia-logging'
declare const IS_DEV_BUILD: boolean;

export class MainLogger
{ 
    constructor()
    {

        if (IS_DEV_BUILD)
        {
            setLevel(logLevel.debug);
        }
        else
        {
            setLevel(window.location.search.match(/.*\?debug.*/i) ? logLevel.debug : logLevel.error);                   
        }
    }

    static getLogger(name: string)
    {
        return getLogger(name);
    }
}