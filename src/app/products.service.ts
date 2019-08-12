import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient } from "@angular/common/http";

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    
    private url = "http://private-1c19e-reactlesson.apiary-mock.com/products";
    
    constructor(private http: HttpClient) { }
  
    getProducts(){
        
        return this.http.get<Product[]>(this.url).pipe(
            map(res => 
                {  
                   return res.map( item => {
                        return new Product(
                            item.id,
                            item.name,
                            item.description,
                            item.photo,
                            item.price,
                            item.in_stock
                        ); 
                   })
                }
            )
        );
    
    }
  
}

export class Product {
    
    constructor(
        public id : number,
        public name : string,
        public description : string,
        public photo : string,
        public price : string,
        public in_stock : boolean
        
    ){}
    
}
