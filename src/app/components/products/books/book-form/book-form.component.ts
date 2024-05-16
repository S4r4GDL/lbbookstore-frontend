import { Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckbox} from "@angular/material/checkbox";
import {Book} from "../shared/book";
import {BookService} from "../shared/book.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DialogsErrorComponent} from "../../../dialogs/error/dialogs.error.component";
import {BasicDialogComponent} from "../../../dialogs/basic/basic.dialog.component";

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatSelect,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatCheckbox,
    FormsModule,
    MatDivider,
    MatButton,
    MatTooltip,
    RouterLink,
    NgIf,
    MatOption
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})

export class BookFormComponent implements OnInit  {

  protected titlePage: string = "New book";
  private book : Book = new Book();
  private id !: number;


  constructor(public bookService : BookService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,) {
  }

  bookForm = new FormGroup(
    {
    title: new FormControl("", [Validators.required]),
    author: new FormControl("", [Validators.required]),
    publisher: new FormControl("", [Validators.required]),
    edition: new FormControl("", [Validators.required]),
    releaseYear: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(new Date().getFullYear()),
    ]),
    price: new FormControl(0.0, [
      Validators.required,
      Validators.min(0.5),
    ]),
    active: new FormControl( true, [Validators.required]),
    quantity: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    description: new FormControl("",[Validators.required])
  });


  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("IDto update :"+this.id+":");

    if(this.id){
      this.titlePage = "Update book";
      this.bookService.getById(this.id).subscribe(value=>{
           this.book = value;
          this.bookForm.patchValue({
            active: this.book.active,
            author: this.book.author,
            description: this.book.description,
            edition: this.book.edition,
            price: this.book.price,
            publisher: this.book.publisher,
            quantity: this.book.quantity,
            releaseYear: this.book.releaseYear,
            title :this.book.title});
          console.log("Book to update:", JSON.stringify(this.book));
        }, error => {

        this.dialog.open(DialogsErrorComponent,
          {
            data: {error: error.error.toString()}
          });

      });

    }

  }
  onSubmit() {
    this.book = Object.assign(this.book, this.bookForm.value);
      this.bookService.save(this.book).subscribe(next=>{

        if(!this.id){
          this.openSaveDialog();
        }
        else{
          this.openUpdateDialog();
        }
      }, error=>{

        this.dialog.open(DialogsErrorComponent,
          {
            data: {error: error.error.toString()}
          });

      });
      console.log("Response:", this.bookForm.value);
      console.log("Book:", this.book);


  }

  private openSaveDialog() {
    this.dialog.open(BasicDialogComponent,
      {
        width: '250px',
        data:{title:'Saved', content:'Add more items?', route:'books', redirectOption: 'No', options: ['Keep adding']}
      }).afterClosed().subscribe(value => {
      this.bookForm.reset();
    });
  }

  private openUpdateDialog() {
    this.dialog.open(BasicDialogComponent,
      {
        width: '250px',
        data:{title:'Update', content:'Save changes?', route:'books', redirectOption: 'Ok', options: ['No']}
      });
  }
}
