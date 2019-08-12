import { Component, OnInit , Input } from '@angular/core';

import { ProductsService, Product } from '../products.service';
import { CartService } from '../cart.service';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    
    constructor(private cartServ : CartService){}
    
    ngOnInit() {}
    
    @Input('products') item: Product;
    
    addToCart(prod){
        this.cartServ.addItemToCart(prod);
    }
    
}
