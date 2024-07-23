import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from './books.interface'

@Injectable({
  providedIn: 'root'
})
export class GetBooksService {
  private apiUrl = 'https://bookapi-mfqh.onrender.com/books'
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Query[]> {
      return this.http.get<Query[]>(this.apiUrl)
  }
}
