// Interfaz para el libro
export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: Author;
}

// Interfaz para el autor
interface Author {
  name: string;
  otherBooks: string[];
}

// Interfaz para la consulta
export interface Query {
  book: Book;
}

export interface Filter{
  pages: number;
  genre: string;
}
