import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './dialogs.delete.component.html',
  styleUrl: './dialogs.delete.component.scss'
})

export class DialogsDeleteComponent {
  constructor(public dialogRef: MatDialogRef<DialogsDeleteComponent>) {
  }

}
