import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileSizePipe } from './file-size/file-size.pipe';
import { StockCounterComponent } from './stock-inventory/components/stock-counter/stock-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSizePipe,
    StockCounterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
