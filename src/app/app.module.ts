import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchComponent } from './search/search.component';
import { SortComponent } from './sort/sort.component';
import { CartComponent } from './cart/cart.component';

import { ProductsService } from './products.service';
import { CartService } from './cart.service';
import { HelpFuncService } from './help-func.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    PaginationComponent,
    ProductListComponent,
    SearchComponent,
    SortComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService,CartService,HelpFuncService],
  bootstrap: [AppComponent]
})
export class AppModule { }
