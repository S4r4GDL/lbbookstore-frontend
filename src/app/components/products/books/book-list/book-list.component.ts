import {Component, OnInit} from '@angular/core';
import {BookService} from "../shared/book.service";
import {Book} from "../shared/book";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{

  private books : Book[] = [];
  constructor(public bookService : BookService) {
  }

  ngOnInit(): void {
    this.books[0] ={
        id: 1, title: 'The yellow heart',
        author: 'Pablo Neruda', publisher: 'intrincina',
        edition: '3ed pk', lastUpdate: new Date(),
        active: true,
        yearOfRelease: 1982,
        price: 55.6,
        quantity: 10
      };

    this.bookService.create(this.books[0]);
    this.books = this.bookService.getAll();
  }

  getAll(): Book[]{
    return this.books;
  }


}
