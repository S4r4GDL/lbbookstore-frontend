import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {LoginService} from "../login/shared/login.service";
import {Router} from "@angular/router";
import {CustomValidator} from "../register/custom.validator";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {User} from "../login/shared/user";
import {MatDialog} from "@angular/material/dialog";
import {BasicDialogComponent} from "../basic/dialogs/basic-dialog/basic.dialog.component";
import {DialogsErrorComponent} from "../basic/dialogs/error/dialogs.error.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatDivider,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatTooltip,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSuffix,
    NgOptimizedImage
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
  currentUser?: User;

  constructor(public loginService: LoginService,
              private router: Router,
              public dialog: MatDialog
              ) {
  }

  accountForm = new FormGroup({
    name: new FormControl("", [Validators.pattern('[a-zA-Z ]*')]),
    confirmPassword: new FormControl("", [Validators.required]),
    dataBirth: new FormControl( new Date(), [Validators.required]),
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  }, { validators: CustomValidator });

  today= new Date().getFullYear();
  minDate = new Date(this.today - 120, 0, 1);
  maxDate = new Date(this.today - 18, 0, 1);

  ngOnInit(): void {
    if(this.loginService.isLoggedIn()){
      this.currentUser = this.loginService.getUser();
      this.accountForm.patchValue({
        name :this.currentUser?.name,
        username: this.currentUser?.username,
        dataBirth: this.currentUser?.dataBirth
      })
    }
    else{
      this.dialog.open(DialogsErrorComponent,
        {
          data: {error: "Form is invalid"
          }
        }).afterClosed().subscribe(value => {
          this.router.navigateByUrl("/login");
      });

    }
  }

  protected openUpdateDialog() {
      this.dialog.open(BasicDialogComponent,
        {
          width: '250px',
          data:{title:'Update', content:'Save changes?', route:'account', redirectOption: 'Yes', options: ['No']}
        }).afterClosed().subscribe(result => {
          if(result === "Yes"){
            this.loginService.updateUser(this.currentUser);
            this.currentUser = this.loginService.getUser();
          }

      });
    }

    openCancelDialog() {

      this.dialog.open(BasicDialogComponent,
        {
          width: '250px',
          data:{title:'Cancel', content:'Cancel changes?', route:'account', redirectOption: 'Ok', options: ['No']}
        });

    }
}
