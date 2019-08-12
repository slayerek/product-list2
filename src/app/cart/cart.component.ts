import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";
import { CartService } from '../cart.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    products = [];
    totalSum : number = 0;
    kodRabatowy: FormControl;
    kodRabatowyAktywny : boolean = false;
    
    constructor(private cartProds : CartService) { }

    ngOnInit() { 
        
        this.kodRabatowy = new FormControl();
        this.kodRabatowy.valueChanges.subscribe(kod => {
            
            const kodRabatowyConfig = environment['kodRabatowy'];
            
            if(kodRabatowyConfig.hasOwnProperty(kod)){
                this.cartProds.kodRabatowyVal(kodRabatowyConfig[kod]);
            }else{
                this.cartProds.kodRabatowyVal(kod,false);
            }
            
        });
        
        this.cartProds.messageSource.subscribe( res => { 
            this.products = res.products; 
            this.totalSum = res.totalSum;
            this.kodRabatowyAktywny = res.kodAktywny;
        });//updating products in cart
    }
    
    removeItem(item){
        const index = this.cartProds.findIndex(item);
        this.cartProds.removeItem(index);
    }
    
    removeAll(item){
        const index = this.cartProds.findIndex(item);
        this.cartProds.removeAll(index);
    }
    
    
    
}
