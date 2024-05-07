import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavContainer,
  MatDrawerContent,
  MatSidenav, MatSidenavContent
} from "@angular/material/sidenav";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatToolbar, MatToolbarRow, MatIcon, MatIconButton, MatButton,
    MatSidenavContainer, MatDrawerContainer, MatDrawer, NgIf, RouterOutlet, MatDrawerContent, MatSidenav, MatSidenavContent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
