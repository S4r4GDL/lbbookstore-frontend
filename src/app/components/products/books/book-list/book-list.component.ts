import {Component, OnInit} from '@angular/core';
import {BookService} from "../shared/book.service";
import {Book} from "../shared/book";
import {NgForOf, NgIf} from "@angular/common";
import {BookListItemComponent} from "../book-list-item/book-list-item.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
  MatTextColumn
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatDivider} from "@angular/material/divider";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    BookListItemComponent,
    MatTextColumn,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatLabel,
    MatFormField,
    MatInput,
    MatPaginator,
    MatDivider,
    MatButton,
    RouterLink,
    MatTooltip,
    MatCheckbox,
    MatCard,
    MatCardContent
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})

export class BookListComponent implements OnInit{

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Book>(this.allowMultiSelect, this.initialSelection);
  displayedColumns: string[] = ['select', 'id', 'title', 'author', 'quantity', 'price'];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();

  constructor(public bookService : BookService, route: ActivatedRoute) {
    //this.books = route.snapshot.data['booksData'];
    this.refreshData();
  }

  ngOnInit(): void {
  }

  refreshData(): void{
    this.bookService.getAll().subscribe(value => {
      console.log("refreshData book-list component value",value);
      this.dataSource.data = value;
      console.log("refreshData data source book-list component");
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }



}
