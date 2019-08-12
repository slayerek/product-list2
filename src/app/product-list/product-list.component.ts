import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../products.service';
import { SearchComponent } from '../search/search.component'; 
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    allProducts:Product[] = [];//all products from API
    prodList:Product[] = [];//render in view
    foundProds:Product[];
    pageInd : number = 0;
    showPagination : boolean = true;
    sortName : string = 'id';
    sortDir : string = 'asc';
    
    
    constructor(
        private products : ProductsService,
    ) { }
    
    ngOnInit() {
        this.products.getProducts().subscribe( res => {
            this.allProducts = res;
            this.updateProductList(res); 
        });//first website load - add all products from API to product-list view
    }
    
    receivePageInd($event) {
        this.pageInd = $event;
        this.updateProductList(this.allProducts);
    }//receive page index number from pagination component
    
    receiveSearchString($event){
        const { foundItems , length } = this.getFoundItems(this.allProducts,$event);
        this.foundProds = foundItems;
        this.sortProducts(this.sortName,this.sortDir,foundItems);
    }//retrieve found products by search
    
    receiveSortValues(sortObj){
        this.sortName = sortObj.sortName;
        this.sortDir = sortObj.direction;
        this.sortProducts(sortObj.sortName,sortObj.direction,this.foundProds !== undefined ? this.foundProds : this.allProducts );
    }//rertieve sort values

    sortProducts(sortName='id',sortDir='asc',arr=[]){
        
        let sortProducts = arr;
        
        if(sortDir=='asc'){ 
            sortProducts.sort(function(a, b){ 
                const elemA = a[sortName];
                const elemB = b[sortName];
                
                if(sortName=='name') return elemA.localeCompare(elemB);
                 
                return elemA - elemB; 
            });
        }else if(sortDir=='dsc'){
            sortProducts.sort(function(a, b){ 
                const elemA = a[sortName];
                const elemB = b[sortName];
                
                if(sortName=='name') return elemB.localeCompare(elemA);
                
                return elemB - elemA; 
            });
        }
           
        this.updateProductList(sortProducts);
    }
    
    updateProductList(products){
        
        const numberOfProducts = products.length;
        const limitProductsPerPage = environment.limitProductsPerPage;
        const pageInd = this.pageInd;
        let productsToShow = [];
        
        if(numberOfProducts > limitProductsPerPage){
            if(pageInd==0){
                productsToShow = products.slice(pageInd*limitProductsPerPage,limitProductsPerPage);
            }else{
                productsToShow = products.slice(pageInd*limitProductsPerPage,limitProductsPerPage*(pageInd+1));
            } 
        }else{
            this.showPagination = false//turn off pagination
            productsToShow = products;
        }
        
        this.prodList = productsToShow;
        
    }//update list of products in product list view
    
    getFoundItems(array,searchingString){

        let searchItems = [];
        let length; 

        for(let item of array){
            if( item.name.search(new RegExp(searchingString, "i")) > -1 ){
                searchItems.push(item);
            }
        }

        length = searchItems.length

        return { foundItems : searchItems , length : length };

    }//return found items in array
    
    
}
