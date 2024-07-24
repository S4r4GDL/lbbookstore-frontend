import { Injectable } from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, tap} from "rxjs";
import {Router} from "@angular/router";
import { jwtDecode } from 'jwt-decode';
import {TokenDTO} from "./tokenDTO";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly TOKEN = 'TOKEN';
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http!: HttpClient;

  private apiUrl!: String;
  private user?: User;

  constructor(http:HttpClient, private router:Router, public dialog: MatDialog) {
    this.http = http;
    this.apiUrl = environment.apiUrl;
  }

  public login(user: User) {
    return this.http.post<TokenDTO>(`${this.apiUrl}/auth/login`, user)
      .pipe(
        tap((tokenDTO: TokenDTO) => {
          this.doLoginUser(tokenDTO.token);
        })
      );
  }

  private doLoginUser(token: any) {
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
    this.user = new User();
    this.user.id =  this.getDecodedToken()?.sub;
    this.user.name = this.getDecodedToken()?.name;
    this.user.username = this.getDecodedToken()?.username;
    this.user.dataBirth = this.getDecodedToken()?.dataBirth;
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.TOKEN, jwt);
  }

  register(user: User) {
    return this.http.post<TokenDTO>(`${this.apiUrl}/auth/register`, user)
      .pipe(
        tap((tokenDTO: TokenDTO) => {
          this.doLoginUser(tokenDTO.token);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
    this.user = new User();
  }

  isLoggedIn() {
    return localStorage.getItem(this.TOKEN);
  }

  public getDecodedToken(): any {
    const token = localStorage.getItem(this.TOKEN);
    if(token){
      return jwtDecode(token);
    }
  }


  getUserRole():string{
    if(this.isLoggedIn()){
      return this.getDecodedToken().scope.toString();
    }else{
      return "GUEST";
    }
  }

  getUser() {
    if(this.isLoggedIn()){
      return this.user;
    }
    return new User;
  }

  updateUser(currentUser: any){
      return this.http.put<TokenDTO>(`${this.apiUrl}/auth/`, currentUser)
        .pipe(
          tap((tokenDTO: TokenDTO) => {
            this.doLoginUser(tokenDTO.token);
          })
        );

}
}
