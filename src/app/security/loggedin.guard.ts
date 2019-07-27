import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'app/security/login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) { }

    checkAuthentication(path: string): boolean {
        // retorna TRUE ou FALSE se o usuário está logado ou não
        const loggedIn = this.loginService.isLoggedIn();

        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`);
        }

        return loggedIn;
    }

    canLoad(route: Route): boolean {
        console.log('CanLod');
        return this.checkAuthentication(route.path);
    }

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        // ActivatedRouter possui o mesmo objeto route do CanLoad porém com nome diferente 'routeConfig'
        console.log('CanActivate');
        return this.checkAuthentication(route.routeConfig.path);
    }
}