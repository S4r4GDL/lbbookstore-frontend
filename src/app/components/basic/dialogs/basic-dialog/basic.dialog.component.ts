import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
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
  templateUrl: './basic.dialog.component.html',
  styleUrl: './basic.dialog.component.scss'
})
export class BasicDialogComponent {
  title!: string;
  content!: string;
  route!:string
  redirectOption!: string;
  options!: string[];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = this.data.title;
    this.content = this.data.content;
    this.route = this.data.route;
    this.redirectOption = this.data.redirectOption;
    this.options = this.data.options;

  }

}
