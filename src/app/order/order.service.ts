import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MEAT_API } from '../app.api';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { LoginService } from '../security/login/login.service';
import { Order } from './order.model';

@Injectable()
/**
 * Métodos de Fachada - FACADE
 */
export class OrderService {

    constructor(private cartService: ShoppingCartService,
        private http: HttpClient,
        private loginService: LoginService) { }

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item);
    }

    itemsValue(): number {
        return this.cartService.total();
    }

    checkOrder(order: Order): Observable<string> {
        let headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.usuario.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, { headers: headers }).map(order => order.id);
    }

    clear() {
        this.cartService.clear();
    }

}
