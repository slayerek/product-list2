import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HelpFuncService } from './help-func.service';
import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    
    private cookie_name : string = 'product_list';
    private kod_rabatowy : number = 0;
    private kodAktywny : boolean = false;
    messageSource = new BehaviorSubject({ products : this.getItems() , totalSum : this.countTotalSum() , kodAktywny : this.kodAktywny });
    
    
    constructor(private helpFunc : HelpFuncService) { }
    
    addItemToCart(prod){
        
        let products = [];
        let items = this.getItems();
        prod.quantity = 1;
        prod.sum_price = 0;
        
        if(items){
            
            const index = this.findIndex(prod);
            
            if( index > -1){
                
                const elem = items[index];
                elem.quantity += 1;
                elem.sum_price = elem.quantity * elem.price;
                
                items.splice(index,1,elem);
                products = items;
            }else{
                products = items;
                prod.sum_price = prod.price;
                products.push( prod );
            }
            
        }else{
            prod.sum_price = prod.price;
            products.push( prod );
        }
        
        
        this.saveItem(this.helpFunc.parseToString(products));//zapisanie produktow do cookie
        this.messageSource.next({ products : products, totalSum : this.countTotalSum() , kodAktywny : this.kodAktywny   });//aktualizacja listy produktow w widoku
        
    }//dodanie elementu do koszyka
    
    countTotalSum(){
        const items = this.getItems();
        let totalSum = 0;
        const kod_rabatowy = this.kod_rabatowy;
        this.kodAktywny = false;
        
        for(let item of items){
            totalSum += item.price * item.quantity;
        }
        
        if(totalSum==0) return 0;
            
        if( kod_rabatowy > 0 && totalSum > kod_rabatowy ){
            this.kodAktywny = true;
            return totalSum - kod_rabatowy;
        }
        
        return totalSum;
    }//zliczenie sumy dla produktów w koszyku uwzdlędniające rabat ( jeżeli został wprowadzony )
    
    findIndex(prod){
        
        const element = this.getItems().findIndex( (elem,ind,arr) => {
            if( elem['name'] == prod['name'] ){
                return true;
            }else{
                return false;
            } 
        });
        
        return element;
        
    }//znalezienie indexu produktu
    
    removeAll(id){
        let items = this.getItems();
        items.splice(id,1);
        
        this.saveItem(this.helpFunc.parseToString(items));
        this.messageSource.next({ products : items , totalSum : this.countTotalSum() , kodAktywny : this.kodAktywny  });
    }//usunięcie wszystkich produktów z koszyka i cookie
    
    removeItem(id){
        let items = this.getItems();
        const elem = items[id];
        
        if(elem['quantity'] == 1){
            items.splice(id,1);
        }else{
            elem['quantity'] -= 1;
            elem['sum_price'] -= elem['price'];
            items.splice(id,1,elem);
        }
        
        this.saveItem(this.helpFunc.parseToString(items));
        this.messageSource.next({ products : items , totalSum : this.countTotalSum() , kodAktywny : this.kodAktywny });
    }//usunięcie produktu z koszyka i z cookie
    
    saveItem(products){
        Cookies.set(this.cookie_name, products, {expires : 2});   
    }//zapisanie produktu z koszyka do cookie
    
    getItems(){
        if(Cookies.get(this.cookie_name) !== undefined){
            return this.helpFunc.parseToObject(Cookies.get(this.cookie_name));
        }
        return false;
    }//pobranie listy produktów z cookie, API było wywoływane tylko raz w celu zapisania produktów do ciasteczka
    
    
    
    kodRabatowyVal(val,kodTrue = true){
        if(kodTrue)
            this.kod_rabatowy = val;
        else
            this.kod_rabatowy = 0;
        
        this.messageSource.next({ products : this.getItems() , totalSum : this.countTotalSum() , kodAktywny : this.kodAktywny });
        
    }//
    
}// serwis koszyka
