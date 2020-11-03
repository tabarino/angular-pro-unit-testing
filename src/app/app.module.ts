import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FileSizePipe } from './file-size/file-size.pipe';
import { StockCounterComponent } from './stock-inventory/components/stock-counter/stock-counter.component';
import { StockBranchComponent } from './stock-inventory/components/stock-branch/stock-branch.component';
import { StockProductsComponent } from './stock-inventory/components/stock-products/stock-products.component';
import { StockSelectorComponent } from './stock-inventory/components/stock-selector/stock-selector.component';
import { StockInventoryComponent } from './stock-inventory/containers/stock-inventory/stock-inventory.component';

@NgModule({
    declarations: [
        AppComponent,
        FileSizePipe,
        StockCounterComponent,
        StockBranchComponent,
        StockProductsComponent,
        StockSelectorComponent,
        StockInventoryComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
