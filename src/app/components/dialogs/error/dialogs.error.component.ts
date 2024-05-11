import {Component, Inject, Injectable} from '@angular/core';
import {
  MAT_DIALOG_DATA,
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
  templateUrl: './dialogs.error.component.html',
  styleUrl: './dialogs.error.component.scss'
})

@Injectable({
  providedIn:'root'
})
export class DialogsErrorComponent {
  constructor(public dialogRef: MatDialogRef<DialogsErrorComponent>,  @Inject(MAT_DIALOG_DATA) public data: {error:string}) {
  }

}
