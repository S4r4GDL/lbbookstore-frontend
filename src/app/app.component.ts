import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {HeaderComponent} from "./components/header/header.component";
import {MatDrawer, MatDrawerContainer, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    RouterLink, HeaderComponent, MatDrawerContainer, MatDrawer, MatSidenavContainer, NgIf, MatButton, MatIcon, MatIconButton, MatSidenavContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LBbookstore';
}
