import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-register-layout',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatTooltip,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-register-layout.component.html',
  styleUrl: './login-register-layout.component.scss'
})
export class LoginRegisterLayoutComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() redirect: string = "";
  @Input() redirectUrl: string = "/";
  @Input() redirectText: string = "";
  @Input() buttonName: string = "";
  @Input() disableButton: boolean = true;

  @Output("submit") onSubmit = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }

}
