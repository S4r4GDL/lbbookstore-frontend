import {Component, inject} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatMenuItem} from "@angular/material/menu";
import {MatCard, MatCardContent, MatCardFooter} from "@angular/material/card";
import {LoginService} from "../login/shared/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    RouterOutlet,
    MatSidenav,
    MatButton,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatDivider,
    MatFabButton,
    MatListItem,
    MatMenuItem,
    MatCard,
    MatCardContent,
    MatCardFooter,
    NgIf
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  public currentUser = "VISIT";
  constructor(){
    if(this.loginService.isLoggedIn()){
      this.currentUser = this.loginService.getUserRole();
    }
  }

  loginService = inject(LoginService);


  public logout(){
    this.loginService.logout();
  }
  toggle() {
    this.status = !this.status;
  }

  protected status = false;
}
