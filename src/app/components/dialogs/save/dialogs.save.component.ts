import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    RouterLink
  ],
  templateUrl: './dialogs.save.component.html',
  styleUrl: './dialogs.save.component.scss'
})
export class DialogsSaveComponent {
  constructor(public dialogRef: MatDialogRef<DialogsSaveComponent>) {
  }

}
