import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';

import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
    selector: "mt-order",
    templateUrl: "./order.component.html"
})
export class OrderComponent implements OnInit {

    orderForm: FormGroup;

    delivery: number = 8;

    orderId: string;

    paymentOptions: RadioOption[] = [
        { label: "Dinheiro", value: "MON" },
        { label: "Cartão de Débito", value: "DEB" },
        { label: "Vale Refeição", value: "REF" }
    ];

    enderecoNumeroPadrao = /^[0-9]*$/;

    constructor(private orderService: OrderService, private router: Router, private fb: FormBuilder) { }

    ngOnInit() {
        this.orderForm = this.fb.group({
            nome: this.fb.control('', [Validators.required, Validators.minLength(5)]),
            email: this.fb.control('', [Validators.required, Validators.email]),
            emailConfirmacao: this.fb.control('', [Validators.required, Validators.email]),
            endereco: this.fb.control('', [Validators.required, Validators.minLength(5)]),
            numero: this.fb.control('', [Validators.required, Validators.pattern(this.enderecoNumeroPadrao)]),
            complemento: this.fb.control(''),
            opcaoDePagamento: this.fb.control('', [Validators.required]),
        }, { validator: OrderComponent.emailsEqualsTo });
    }

    static emailsEqualsTo(group: AbstractControl): { [key: string]: boolean } {
        const email = group.get('email');
        const emailConfirmacao = group.get('emailConfirmacao');
        if (!email || !emailConfirmacao) {
            return undefined;
        }

        if (email.value !== emailConfirmacao.value) {
            return { emailsNotMatch: true };
        }
        return undefined;
    }

    cartItems(): CartItem[] {
        return this.orderService.cartItems();
    }

    increaseQty(item: CartItem) {
        return this.orderService.increaseQty(item);
    }

    decreaseQty(item: CartItem) {
        return this.orderService.decreaseQty(item);
    }

    remove(item: CartItem) {
        return this.orderService.remove(item);
    }

    itemsValue(): number {
        return this.orderService.itemsValue();
    }

    checkOrder(order: Order) {
        order.orderItems = this.cartItems().map(
            (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
        );
        this.orderService.checkOrder(order)
            .do((orderId: string) => {
                this.orderId = orderId;
            })
            .subscribe((orderId: string) => {
                this.router.navigate(['/order-summary']);
                this.orderService.clear();
            });
    }

    isOrderCompleted(): boolean {
        return this.orderId != undefined;
    }
}
