import {Component} from '@angular/core';
import {BookService} from "../shared/book.service";
import {Book} from "../shared/book";
import {NgClass, NgForOf, NgIf} from "@angular/common";
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
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {DialogsDeleteComponent} from "../../../basic/dialogs/delete/dialogs.delete.component";
import {DialogsErrorComponent} from "../../../basic/dialogs/error/dialogs.error.component";
import {LoginService} from "../../../login/shared/login.service";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
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
    MatCardContent,
    MatIcon,
    NgClass,
    NgIf
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})

export class BookListComponent{

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Book>(this.allowMultiSelect, this.initialSelection);
  displayedColumns: string[] = ['select', 'id', 'name', 'author', 'publisher', 'edition', 'releaseYear', 'description', 'quantity', 'price', 'lastUpdate', 'active','actions'];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  book!: Book;
  currentUserRole!: string;

  constructor(public bookService : BookService,
              public route: ActivatedRoute,
              public dialog: MatDialog,
              public loginService: LoginService) {

    this.currentUserRole = this.loginService.getUserRole();
    this.dataSource.data = route.snapshot.data['bookData'];

  }

  refreshData(): void{
    this.bookService.getAll().subscribe((data: Book[]) => {
      if(data)
        this.dataSource.data = data;

    },error => {
      this.dataSource.data = [];
      this.dialog.open(DialogsErrorComponent,
        {
          data: {error: error.error.toString()
          }
        });

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
      this.dataSource.data.forEach(book => {
          this.selection.select(book);

        console.log("this.selection.selected: {}", this.selection.selected )


        }
      );
  }





//delete item by its row
   delete(book: Book) {

      console.log("Book To delete", JSON.stringify(book));

      this.bookService.delete(book.id).subscribe(value => {

        console.log("Deleted:", JSON.stringify(value));
        this.refreshData();

      }, error => {

        this.dialog.open(DialogsErrorComponent,
          {
            data: {error: error.error.toString()}
          });
      });
  }


confirmDelete( book: Book) {
  this.dialog.open(DialogsDeleteComponent,
    {
      width: '250px',

    }).afterClosed().subscribe(result => {

      if(result) {
        this.delete(book);
      }

    });
  }




  //delete more than one item


  confirmDeleteItems() {
    this.dialog.open(DialogsDeleteComponent,
      {
        width: '250px',

      }).afterClosed().subscribe(result => {

      if(result) {
        console.log("this.selection.selected: {}", this.selection.selected );
        this.deleteItems(this.selection.selected);

      }

    });
  }

  private deleteItems(books: Book[]) {

    this.bookService.deleteItems(books).subscribe(value => {

      console.log("Deleted:", JSON.stringify(value));
      this.refreshData();

    }, error => {

      this.dialog.open(DialogsErrorComponent,
        {
          data: {error: error.error.toString()}
        });
    });

  }
}
