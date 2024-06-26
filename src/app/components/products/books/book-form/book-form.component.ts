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
import {AsyncPipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DialogsErrorComponent} from "../../../basic/dialogs/error/dialogs.error.component";
import {BasicDialogComponent} from "../../../basic/dialogs/basic-dialog/basic.dialog.component";
import {
  SelectBasicWithDisableComponent
} from "../../../basic/select-basic-with-disable/select-basic-with-disable.component";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {LoginService} from "../../../login/shared/login.service";

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
    MatOption,
    SelectBasicWithDisableComponent,
    MatAutocomplete,
    MatAutocompleteTrigger,
    AsyncPipe
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})

export class BookFormComponent implements OnInit  {

  protected titlePage: string = "New book";
  private book : Book = new Book();
  private id !: number;
  protected publishers !: String[];
  public currentUserRole!: string;
  constructor(public bookService : BookService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public loginService: LoginService) {
    this.currentUserRole = this.loginService.getUserRole();
  }

  bookForm = new FormGroup(
    {
    name: new FormControl("", [Validators.required]),
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
    description: new FormControl()
  });


  filteredPublishers?: Observable<String[]>;

  private filterPublishers(value: String): String[] {
    const filterValue = value.toLowerCase();

    return this.publishers.filter(publisher => publisher.toLowerCase().includes(filterValue));
  }


  ngOnInit(){

    if(!(this.loginService.getUserRole() === "ROLE_ADMIN")){
      this.dialog.open(BasicDialogComponent,
        {
          width: '250px',
          data:{title:'Error', content:'Not allowed', route:'books', redirectOption: 'Ok'}
        });

    }else{
    this.bookService.getAllPublishers().subscribe(value=>{
      this.publishers = value;

      this.filteredPublishers = this.bookForm.controls.publisher.valueChanges.pipe(
        startWith(''),
        map(value => this.filterPublishers(value || '')),
      );

    });

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
            name :this.book.name});
          console.log("Book to update:", JSON.stringify(this.book));
        }, error => {

        this.dialog.open(DialogsErrorComponent,
          {
            data: {error: error.error.toString()}
          });

      });

    }

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
        if(value == 'Keep adding')
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

  openCancelDialog() {

    this.dialog.open(BasicDialogComponent,
      {
        width: '250px',
        data:{title:'Cancel', content:'Cancel changes?', route:'books', redirectOption: 'Ok', options: ['No']}
      });

  }
}
