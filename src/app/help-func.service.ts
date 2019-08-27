import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelpFuncService {

    constructor() { }
  
    parseToString(products){
        return JSON.stringify(products);
    }//parsowanie obiektów do stringa
    
    parseToObject(products){
        return JSON.parse(products);
    }//parsowanie stringa do obiektu
  
}//serwis zawierający pomocnicze fukncje do całego projektu
