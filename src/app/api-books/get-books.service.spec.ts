import { TestBed } from '@angular/core/testing';

import { GetBooksService } from './get-books.service';
import { HttpClientModule } from '@angular/common/http';

describe('GetBooksService', () => {
  let service: GetBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GetBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe enviar los libros de forma correcta', (done : DoneFn) => {
    service.getBooks().subscribe(value => {
      expect(value[0].book.title).toBe('El Señor de los Anillos')
      done()
    })
  })
});
