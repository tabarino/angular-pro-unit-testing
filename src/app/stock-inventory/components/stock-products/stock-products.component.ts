import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
    selector: 'stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.scss']
})
export class StockProductsComponent implements OnInit {
    @Input() parent: FormArray;
    @Input() map: Map<number, Product>;
    @Output() remove = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    getProduct(id) {
        return this.map.get(id);
    }

    removeProduct(group, index) {
        this.remove.emit({ group, index });
    }

    get stocks() {
        return (this.parent?.get('stock') as FormArray)?.controls;
    }
}
