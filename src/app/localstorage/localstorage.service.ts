import { Injectable } from '@angular/core';
import { Query } from '../api-books/books.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  setLocalStorage(localname : string,input : Query[]) : void{
    localStorage.setItem(localname, JSON.stringify(input))
  }

  getLocalStorage(input : string) : Query[]{
    return Object.values(JSON.parse(localStorage.getItem(input) ?? "{}"))
  }
}
