import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/books';
  }

  getAll(): Observable<Book[]> {
    console.log("getAll no service");
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  save(book: Book): Observable<Book> {
    let response: Observable<Book>;

    if (book.id) {
      console.log("Updating data:" + JSON.stringify(book));
      response = this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
    } else {
      console.log("Creating a new book:" + JSON.stringify(book));
      response = this.http.post<Book>(`${this.apiUrl}`, book);
    }

    return response;
  }

  delete(id: number): Observable<Book> {
    console.log("Deleting a book by id:" + id);
    return this.http.delete<Book>(`${this.apiUrl}/${id}`);
  }

  deleteItems(books: Book[]): Observable<Book[]> {
    console.log("Deleting a list of books:" + JSON.stringify(books));
    return this.http.delete<Book[]>(`${this.apiUrl}`, { body: books });
  }

  getAllPublishers(): Observable<string[]> {
    console.log("Publishers get ALL");
    return this.http.get<string[]>(`${this.apiUrl}/search/all-publishers`);
  }
}
