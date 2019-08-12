import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelpFuncService {

    constructor() { }
  
    parseToString(products){
        return JSON.stringify(products);
    }
    
    parseToObject(products){
        return JSON.parse(products);
    }
  
}
