import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
    selector: 'mt-restaurants',
    templateUrl: './restaurants.component.html',
    animations: [
        trigger('toggleSearch', [
            state('hidden', style({
                opacity: 0,
                "max-height": "0px"
            })),

            state('visible', style({
                opacity: 1,
                "max-height": "70px",
                "margin-top": "20px"
            })),
            transition('*=>*', animate('250ms 0s ease-in-out'))
        ])
    ]
})
export class RestaurantsComponent implements OnInit {

    restaurants: Restaurant[];

    searchBarState = 'hidden';

    searchForm: FormGroup;

    searchControl: FormControl;

    constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

    ngOnInit() {

        this.searchControl = this.fb.control('');
        this.searchForm = this.fb.group({
            searchControl: this.searchControl
        });

        this.searchControl.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .do(searchTerm => console.log(`q=${searchTerm}`))
            .switchMap(searchTerm =>
                this.restaurantsService.restaurants(searchTerm))
            .subscribe(restaurants => this.restaurants = restaurants);

        this.restaurantsService.restaurants().subscribe(res => {
            this.restaurants = res;
        });
    }

    toggleSearch() {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
    }

}
