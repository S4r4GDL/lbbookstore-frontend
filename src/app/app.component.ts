import {Component, Injectable, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {HeaderComponent} from "./components/header/header.component";
import {MatDrawer, MatDrawerContainer, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {LoginService} from "./components/login/shared/login.service";
import {LoginComponent} from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    RouterLink, HeaderComponent, MatDrawerContainer, MatDrawer, MatSidenavContainer, NgIf, MatButton, MatIcon, MatIconButton, MatSidenavContent, MatToolbar, SidenavComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LBbookstore';
  toolbarActive = true;
}
