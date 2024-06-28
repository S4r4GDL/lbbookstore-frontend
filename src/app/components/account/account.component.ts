import { Component, OnInit } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {LoginService} from "../login/shared/login.service";
import {Router} from "@angular/router";

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
        ReactiveFormsModule
    ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  currentUserRole: any;

  constructor(public loginService: LoginService, private router: Router,) {
    this.currentUserRole = this.loginService.getUserRole();
  }

}
