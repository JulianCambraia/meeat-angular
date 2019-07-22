import { Component, OnInit } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { RadioOption } from "app/shared/radio/radio-option.model";

import { Order, OrderItem } from "./order.model";
import { OrderService } from "./order.service";
import { Router } from '@angular/router';

@Component({
    selector: "mt-order",
    templateUrl: "./order.component.html"
})
export class OrderComponent implements OnInit {
    delivery: number = 8;

    paymentOptions: RadioOption[] = [
        { label: "Dinheiro", value: "MON" },
        { label: "Cartão de Débito", value: "DEB" },
        { label: "Vale Refeição", value: "REF" }
    ];

    constructor(private orderService: OrderService, private router: Router) { }

    ngOnInit() { }

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
        this.orderService.checkOrder(order).subscribe((orderId: string) => {
            this.router.navigate(['/order-summary']);
            this.orderService.clear();
        });
    }
}
