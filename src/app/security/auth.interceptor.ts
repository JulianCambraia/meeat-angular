import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const loginService = this.injector.get(LoginService);
        if (loginService.isLoggedIn()) {
            // chamou clone pois o request é imutável
            // para setar parâmetros no Header passe através do setHeaders dentro do clone.
            let newRequest = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${loginService.usuario.accessToken}`
                }
            });
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
    }
}