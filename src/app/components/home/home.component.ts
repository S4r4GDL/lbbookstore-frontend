import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {BookListComponent} from "../products/books/book-list/book-list.component";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    MatDrawer,
    MatDrawerContainer,
    NgIf,
    BookListComponent,
    MatIcon,
    MatIconButton,
    MatToolbar,
    SidenavComponent,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showFiller: boolean = false;
}
