import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[];

  @Output() aumentarQuantidade = new EventEmitter<CartItem>();

  @Output() diminuirQuantidade = new EventEmitter<CartItem>();

  @Output() removerItem = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit() {
  }

  emitIncreaseItem(item: CartItem) {
    this.aumentarQuantidade.emit(item);
  }

  emitDecreaseItem(item: CartItem) {
    this.diminuirQuantidade.emit(item);
  }

  emitRemoverItem(item: CartItem) {
    this.removerItem.emit(item);
  }

}
