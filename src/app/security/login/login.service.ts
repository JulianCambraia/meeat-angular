import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MEAT_API } from 'app/app.api';
import { Observable } from 'rxjs';

import { Usuario } from './usuario.model';

@Injectable()
export class LoginService {

    usuario: Usuario;

    constructor(private httpClient: HttpClient) { }

    isLoggedIn(): boolean {
        return this.usuario !== undefined;
    }

    login(email: string, password: string): Observable<Usuario> {
        return this.httpClient.post<Usuario>(`${MEAT_API}/login`, { email: email, password: password })
            .do(usuario => this.usuario = usuario);
    }
}