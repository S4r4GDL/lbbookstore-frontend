import {Component, Input} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule } from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-basic-select-with-disable',
  standalone: true,
  imports: [
    MatCheckbox,
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatLabel,
    NgForOf
  ],
  templateUrl: './select-basic-with-disable.component.html',
  styleUrl: './select-basic-with-disable.component.scss'
})
export class SelectBasicWithDisableComponent {

  @Input() options!: String[];

  disableSelect = new FormControl(false);
  @Input() title!: string;
  @Input() disableOption!: string;
  @Input() labelText!: string;
  @Input() classFormat!: string;

}
