import {Component} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LoginService} from "./shared/login.service";
import {MatIcon} from "@angular/material/icon";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {User} from "./shared/user";
import {DialogsErrorComponent} from "../basic/dialogs/error/dialogs.error.component";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    AsyncPipe,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatDivider,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSelect,
    MatTooltip,
    ReactiveFormsModule,
    MatIcon,
    NgOptimizedImage,
    RouterLink,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSuffix
  ],
  providers: [
  MatDatepickerModule,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = new User();
  constructor(public loginService: LoginService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router, private formBuilder: FormBuilder) {
  }

  loginForm = this.formBuilder.group({
    userName: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {

      this.user.username = this.loginForm.get('userName')?.value;
      this.user.password = this.loginForm.get('password')?.value;

      this.loginService.login(this.user).subscribe(
        () => {
          this.router.navigateByUrl('');

        });}
      else {
      this.dialog.open(DialogsErrorComponent,
        {
          data: {error: "Form is invalid"
          }
        });
    }
  }
}
