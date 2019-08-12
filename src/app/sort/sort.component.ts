import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
    
    @Output() messageEvent = new EventEmitter<any>();
    
    constructor() { }

    ngOnInit() {
    } 
    
    getSortValues(sortName,direction){
        this.messageEvent.emit({'sortName':sortName , 'direction' : direction });
    }
  

}
