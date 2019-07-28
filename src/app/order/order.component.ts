import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { tap } from 'rxjs/operators';

import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
    selector: "mt-order",
    templateUrl: "./order.component.html"
})
export class OrderComponent implements OnInit {

    orderForm: FormGroup;

    order: Order;

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
        this.order = new Order();
        this.orderForm = new FormGroup({
            nome: new FormControl(this.order.nome, [Validators.required, Validators.minLength(5)]),
            email: new FormControl(this.order.email, [Validators.required, Validators.email]),
            emailConfirmacao: new FormControl(this.order.emailConfirmacao, [Validators.required, Validators.email]),
            endereco: new FormControl(this.order.endereco, [Validators.required, Validators.minLength(5)]),
            numero: new FormControl(this.order.numero, [Validators.required, Validators.pattern(this.enderecoNumeroPadrao)]),
            complemento: new FormControl(this.order.complemento),
            opcaoDePagamento: new FormControl(null, [Validators.required]),
        }, { validators: [OrderComponent.emailsEqualsTo], updateOn: 'blur' });

        console.log(this.orderForm);

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
            .pipe(tap((orderId: string) => {
                this.orderId = orderId;
            }))
            .subscribe((orderId: string) => {
                this.router.navigate(['/order-summary']);
                this.orderService.clear();
            });
    }

    isOrderCompleted(): boolean {
        return this.orderId != undefined;
    }
}
