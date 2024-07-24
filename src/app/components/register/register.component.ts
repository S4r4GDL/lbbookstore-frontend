import { Component } from '@angular/core';
import {User} from "../login/shared/user";
import {LoginService} from "../login/shared/login.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomValidator} from "./custom.validator";
import {MatButton} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {MatNativeDateModule} from "@angular/material/core";
import {DialogsErrorComponent} from "../basic/dialogs/error/dialogs.error.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDivider,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    MatTooltip,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSuffix
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = new User();
  constructor(public loginService: LoginService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router, private formBuilder: FormBuilder) {
  }

  registerForm = this.formBuilder.group({
    name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(5)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
    dataBirth: new FormControl( new Date(), [Validators.required]),
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  }, { validators: CustomValidator });

  today= new Date().getFullYear();
  minDate = new Date(this.today - 120, 0, 1);
  maxDate = new Date(this.today - 18, 0, 1);


  onSubmit() {
    console.error(' register form{}:', JSON.stringify(this.registerForm.value));
  if(this.registerForm.valid){

    this.user = Object.assign(this.user, this.registerForm.value);
    console.error('user{}:', JSON.stringify(this.user));

    this.loginService.register(this.user).subscribe(
      () => {
        this.router.navigateByUrl('/account');
      },
      (error) => {
        this.dialog.open(DialogsErrorComponent,
          {
            data: {error: error.error.toString()
            }
          });
      }
    );
  } else {
    this.dialog.open(DialogsErrorComponent,
    {
      data: {error: "Form is invalid"
      }
    });
    }
  }

}
