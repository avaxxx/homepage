import { HttpClient } from 'aurelia-fetch-client';
import { Logger } from 'aurelia-logging';
import { Container } from 'aurelia-dependency-injection';

export class BaseService{
    protected user: Oidc.User;
    protected logger: Logger;
    protected httpClient: HttpClient;
    constructor(user: Oidc.User){
        this.user = user;
        this.httpClient = Container.instance.get(HttpClient);
        this.initClient();
    }

    protected get token() {
        return this.user != null ? this.user.access_token : '';
    }

    private initClient(){
        this.httpClient.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('/api/')
              .withDefaults({
                credentials: 'same-origin',
                headers: {
                  'X-Requested-With': 'Fetch'
                }
              })
              .withInterceptor({
                request(request: Request) {
                  if (this.token != "")
                  {
                    request.headers.append('Authorization', 'Bearer ' + this.token);                    
                  }
                  return request;
                },
                response(response: Response, request?:Request){
                  if (response.ok){
                    return response;
                  }
                  else
                  {
                    throw new Error(response.status + " " +response.statusText);                    
                  }
                }
              });
          });

    }
}