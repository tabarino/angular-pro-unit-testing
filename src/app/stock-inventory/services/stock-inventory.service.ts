import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item, Product } from '../models/product.interface';

@Injectable()
export class StockInventoryService {
    constructor(private http: HttpClient) { }

    convertSnaps<T>(snaps): T[] {
        return snaps.body.map(snap => snap);
    }

    getCartItems(): Observable<Item[]> {
        return this.http.get<Item[]>('/api/cart').pipe(
            map(snaps => this.convertSnaps<Item>(snaps)),
            catchError(error => throwError(error))
        );
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('/api/products').pipe(
            map(snaps => this.convertSnaps<Product>(snaps)),
            catchError(error => throwError(error))
        );
    }
}
