import { TestBed } from '@angular/core/testing';
import { Query } from '../api-books/books.interface';
import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe guardar un libro en el Local Storage', () => {
    const book : Query[] = [
        {
        "book": {
          "title": "El Señor de los Anillos",
          "pages": 1200,
          "genre": "Fantasía",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
          "synopsis": "Una aventura épica en un mundo de fantasía llamado la Tierra Media.",
          "year": 1954,
          "ISBN": "978-0618640157",
          "author": {
            "name": "J.R.R. Tolkien",
            "otherBooks": [
                "El Hobbit",
                "El Silmarillion"
            ]
          }
        }
      }
    ]
    expect(service.setLocalStorage(["book"],[book])).toBeTrue
  })

  it('Debe obtener un libro del Local Storage', () => {
    const books : Query[] = service.getLocalStorage("book")
    expect(books[0].book.title).toBe('El Señor de los Anillos')
  })
});
