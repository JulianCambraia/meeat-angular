import { NgModule } from '@angular/core';
import { OrderService } from 'app/order/order.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';

import { RestaurantsService } from '../restaurants/restaurants.service';

@NgModule({
    providers: [RestaurantsService, ShoppingCartService, OrderService]
})
export class CoreModule { }
