import { Component, effect, Inject, inject, Injector, PLATFORM_ID, signal } from '@angular/core';
import { GetBooksService } from './api-books/get-books.service';
import { Query } from './api-books/books.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalstorageService } from './localstorage/localstorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'front-books';
  storage = inject(LocalstorageService)

  booksService = inject(GetBooksService)
  books: Query[] = []
  cart: Query[] = []

  genres: string[] = ['Todos','Fantasía','Ciencia ficción','Zombies','Terror']
  genreSelect: string = 'Todos'
  pages = signal(1200)

  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private plataformId: Object
  ){}

  ngOnInit(): void {
    if(isPlatformBrowser(this.plataformId)){
      // localStorage.clear()
      if(!localStorage.getItem("books")){
        localStorage.setItem("genre", this.genreSelect)
        localStorage.setItem("pages", this.pages().toString())

        this.booksService.getBooks().subscribe( (stream: Query[]) =>{
          this.storage.setLocalStorage("books",stream)
          this.storage.setLocalStorage("filter",stream)
          this.books = stream
        })
        this.storage.setLocalStorage("cart",[])
      }
      globalThis.addEventListener('storage',this.onStorageChange.bind(this))

      this.books = this.storage.getLocalStorage("filter")
      this.cart = this.storage.getLocalStorage("cart")
      this.pages.set(Number(localStorage.getItem("pages")))
      this.genreSelect = localStorage.getItem("genre") ?? 'Todos'
    }
  }

  onStorageChange(event: StorageEvent): void {
    switch (event.key) {
      case 'pages':
        setTimeout(() =>
          this.pages.set(Number(event.newValue)),
          500);
        break;
      case 'genre':
        this.genreSelect = event.newValue ?? 'Todos'
        this.filter(this.genreSelect)
        break;
      case 'filter':
        this.books = JSON.parse(event.newValue || "{}")
        break;
      case 'cart':
        this.cart = JSON.parse(event.newValue || "{}")
        break;
    }
  }

  showMenu = false

  toggleMenu = () => this.showMenu = !this.showMenu

  genreClick(genre: string) {
    this.filter(genre)
    this.toggleMenu()
  }

  filter(genre: string) {
    this.genreSelect = genre
    effect(() => {
      this.books = this.storage.getLocalStorage("books")

      if(this.genreSelect !== 'Todos'){
        this.books = this.books.filter(item => item.book.genre === this.genreSelect)
      }
      this.books = this.books.filter(item => item.book.pages <= this.pages())

      this.storage.setLocalStorage("filter",this.books)
      localStorage.setItem("genre", this.genreSelect)
      localStorage.setItem("pages", this.pages().toString())
    },{injector: this.injector})
  }

  addToCart(book : Query, isbn : string): void {
    this.cart.push(book)
    this.books = this.storage.getLocalStorage("books")
    const index = this.books.findIndex(item => item.book.ISBN === isbn)
    this.books.splice(index,1)

    this.storage.setLocalStorage("cart",this.cart)
    this.storage.setLocalStorage("books",this.books)
    this.filter(this.genreSelect)
  }

  spliceToCart(book : Query, isbn : string): void {
    this.books = this.storage.getLocalStorage("books")
    this.books.push(book)
    const index = this.cart.findIndex(item => item.book.ISBN === isbn)
    this.cart.splice(index,1)

    this.storage.setLocalStorage("cart",this.cart)
    this.storage.setLocalStorage("books",this.books)
    this.filter(this.genreSelect)
  }

  ngOnDestroy(): void {
    globalThis.removeEventListener
  }
}
