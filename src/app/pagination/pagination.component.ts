import {Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import {ProductsService,Product} from '../products.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    
    pagesToShowArr = [];
    activeIndex : number = 0;
    
    @Output() messageEvent = new EventEmitter<number>();
    @Input('showPag') showPagination;
    
    constructor(private products: ProductsService) {}

    ngOnInit() {
        
        const limitProductsPerPage = environment.limitProductsPerPage;
        
        this.products.getProducts().subscribe(res => { 
            const pagesToShow = Math.ceil(res.length / limitProductsPerPage); 
            this.pagesToShowArr = new Array(pagesToShow);
        });
        
    }
    
    pageIndex(index){ 
        this.activeIndex = index;
        this.messageEvent.emit(index)
    }
    
}
