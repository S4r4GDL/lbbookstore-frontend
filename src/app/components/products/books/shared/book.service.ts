import { Injectable } from '@angular/core';
import {Book} from "./book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private books : Book[] = [];
  //TODO : Conectar com o back
  private http!: HttpClient;
  constructor(http:HttpClient) {
    this.http = http;
  }

  private storeList(){
    window.localStorage.setItem('books-list', JSON.stringify(this.books));
  }

  private loadList(){
    const list = window.localStorage.getItem('books-list');
    if(list){
      this.books = JSON.parse(list);
    }
  }


  create(newBook : Book){
      if(!this.getById(newBook.id)) {
        newBook.id = this.books.length > 0 ? this.books.length + 1 : 1;
        this.books.push(newBook);
      }
  }

  update(bookToUpdate : Book){
    const bookFind = this.getById(bookToUpdate.id)
    if(bookFind)
    {
      bookFind.title = bookToUpdate.title;
      bookFind.author = bookToUpdate.author;
      bookFind.edition = bookToUpdate.edition;
      bookFind.price = bookToUpdate.price;
      bookFind.publisher = bookToUpdate.publisher;
      bookFind.quantity = bookToUpdate.quantity;
      bookFind.yearOfRelease = bookToUpdate.yearOfRelease;
      bookFind.active = bookToUpdate.active;

      bookFind.lastUpdate = new Date();

    }

  }
  getAll(): Observable<Book[]>{
    console.log("getAll no service");
    return this.http.get<Book[]>("http://localhost:8080/api/v1/books");

  }

  getById(id: number) {
    return this.books.find((value) => value.id == id);
  }


  delete(id: number){
    const bookIndex = this.books.findIndex( (value) => value.id == id);
    this.books.splice(bookIndex, 1);
    this.storeList();
  }

}
