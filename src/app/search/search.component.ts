import {Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";

import {
    debounceTime,
    distinctUntilChanged,
    switchMap,
    tap
} from "rxjs/operators";


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    
    search: FormControl;
    searchVal : string;
    show : boolean = false;
    
    @Output() messageEvent = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {
        
        this.search = new FormControl();
        
        this.search.valueChanges.
            pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe( value => { 
                if(value.length>2){
                    this.messageEvent.emit(value);
                    this.show = false;
                }else{
                    this.show = true;
                }
            } );
        
    }
    
    

}
