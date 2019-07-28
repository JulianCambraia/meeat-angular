import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MEAT_API } from 'app/app.api';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { Usuario } from './usuario.model';

@Injectable()
export class LoginService {

    usuario: Usuario;

    lastUrl: string;

    constructor(private httpClient: HttpClient, private router: Router) {
        // registrando qual a ultima url clicada
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    isLoggedIn(): boolean {
        return this.usuario !== undefined;
    }

    login(email: string, password: string): Observable<Usuario> {
        return this.httpClient.post<Usuario>(`${MEAT_API}/login`, { email: email, password: password })
            .pipe(
                tap(usuario => this.usuario = usuario));
    }

    logout() {
        this.usuario = undefined;
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]);
    }
} 