import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { StockInventoryComponent } from './stock-inventory.component';
import { StockInventoryService } from '../../services/stock-inventory.service';

class MockStockInventoryService {
    getCartItems() {
        return of([{
            product_id: 1,
            quantity: 10
        }, {
            product_id: 2,
            quantity: 5
        }]);
    }

    getProducts() {
        return of([{
            id: 1,
            name: 'Test',
            price: 10
        }, {
            id: 2,
            name: 'Another Test',
            price: 100
        }]);
    }
}

describe('StockInventoryComponent', () => {
    let component: StockInventoryComponent;
    let fixture: ComponentFixture<StockInventoryComponent>;
    let el: DebugElement;
    let service: StockInventoryService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                StockInventoryComponent
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [
                { provide: StockInventoryService, useClass: MockStockInventoryService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StockInventoryComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        service = el.injector.get(StockInventoryService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get cart items and products on init', () => {
        spyOn(service, 'getCartItems').and.callThrough();
        spyOn(service, 'getProducts').and.callThrough();
        component.ngOnInit();
        expect(service.getCartItems).toHaveBeenCalled();
        expect(service.getProducts).toHaveBeenCalled();
    });

    it('should create a product map from the service response', () => {
        component.ngOnInit();
        expect(component.productsMap.get(1)).toEqual({
            id: 1,
            name: 'Test',
            price: 10
        });
        expect(component.productsMap.get(2)).toEqual({
            id: 2,
            name: 'Another Test',
            price: 100
        });
    });

    it('should store the products response', () => {
        component.ngOnInit();
        expect(component.products).toEqual([{
            id: 1,
            name: 'Test',
            price: 10
        }, {
            id: 2,
            name: 'Another Test',
            price: 100
        }]);
    });

    it('should create a stock item for each cart item', () => {
        spyOn(component, 'addStock');
        component.ngOnInit();
        expect(component.addStock).toHaveBeenCalledWith({
            product_id: 1,
            quantity: 10
        });
        expect(component.addStock).toHaveBeenCalledWith({
            product_id: 2,
            quantity: 5
        });
    });
});
