import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StockInventoryService } from './stock-inventory.service';
import { Observable, of } from 'rxjs';

function createResponse(body): Observable<HttpResponse<any>> {
    return of(
        new HttpResponse({ body })
    );
}

class MockHttp {
    get(): Observable<HttpResponse<any>> {
        return createResponse([]);
    }
}

const cartItems = [{
    product_id: 1,
    quantity: 10
}, {
    product_id: 2,
    quantity: 5
}];

const productItems = [{
    id: 1,
    name: 'Test',
    price: 10
}, {
    id: 2,
    name: 'Another Test',
    price: 100
}];

describe('StockInventoryService', () => {
    let service: StockInventoryService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StockInventoryService,
                { provide: HttpClient, useClass: MockHttp }
            ]
        });
        service = TestBed.inject(StockInventoryService);
        http = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get cart items', () => {
        spyOn(http, 'get').and.returnValue(createResponse([...cartItems]));
        service.getCartItems().subscribe((result) => {
            expect(result.length).toBe(2);
            expect(result).toEqual(cartItems);
        });
    });

    it('should get product items', () => {
        spyOn(http, 'get').and.returnValue(createResponse([...productItems]));
        service.getProducts().subscribe((result) => {
            expect(result.length).toBe(2);
            expect(result).toEqual(productItems);
        });
    });
});
