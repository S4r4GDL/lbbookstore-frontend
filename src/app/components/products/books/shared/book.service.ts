import { Injectable } from '@angular/core';
import {Book} from "./book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private http!: HttpClient;

  constructor(http:HttpClient) {
    this.http = http;
  }


  getAll(): Observable<Book[]>{
    console.log("getAll no service");
    return this.http.get<Book[]>('http://localhost:8080/api/v1/books');

  }

  getById(id: number) {
    return this.http.get<Book>(`http://localhost:8080/api/v1/books/${id}`);
  }

  save(book: Book):Observable<Book>{
    let response: Observable<Book>;
    if(book.id) {
      console.log("Updating data:"+JSON.stringify(book))
      response = this.http.put<Book>(`http://localhost:8080/api/v1/books/${book.id}`, book);
    }else{
      console.log("Creating a new book:"+JSON.stringify(book))
      response = this.http.post<Book>('http://localhost:8080/api/v1/books', book);
    }
    return response;
  }

  delete(id: number):Observable<Book>{
   let response = this.http.delete<Book>(`http://localhost:8080/api/v1/books/${id}`);
    console.log("Creating a new book:"+JSON.stringify(response));
   return response;

  }

}
