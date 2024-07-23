import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from './books.interface'

@Injectable({
  providedIn: 'root'
})
export class GetBooksService {
  private apiUrl = 'http://localhost:1234/books'
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Query[]> {
      return this.http.get<Query[]>(this.apiUrl)
  }
}
