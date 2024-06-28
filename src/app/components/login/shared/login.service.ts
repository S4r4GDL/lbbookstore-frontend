import { Injectable } from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, tap} from "rxjs";
import {Router} from "@angular/router";
import { jwtDecode } from 'jwt-decode';
import {TokenDTO} from "./tokenDTO";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly TOKEN = 'TOKEN';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http!: HttpClient;

  private apiUrl!: String;

  constructor(http:HttpClient, private router:Router) {
    this.http = http;
    this.apiUrl = environment.apiUrl+"/auth";
  }

  public login(user: User) {
    return this.http.post<TokenDTO>(`${this.apiUrl}/login`, user)
      .pipe(
        tap((tokenDTO: TokenDTO) => {
          this.storeJwtToken(tokenDTO.token);
        })
      );
  }

  private doLoginUser(token: any) {
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    console.log("TOKEN{}", JSON.stringify(jwt));
    localStorage.setItem(this.TOKEN, jwt);
  }

  register(user: User) {
    return this.http.post<TokenDTO>(`${this.apiUrl}/register`, user)
      .pipe(
        tap((tokenDTO: TokenDTO) => {
          this.storeJwtToken(tokenDTO.token);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.TOKEN);
  }

  public getDecodedToken(): any {
    const token = localStorage.getItem(this.TOKEN);
    if(token){
      console.log("TOKEN DECODED{}", token);
      return jwtDecode(token);
    }
  }


  getUserRole(){
    if(this.isLoggedIn()){
      return this.getDecodedToken().scope.toString();
    }else{
      return "GUEST";
    }

  }
}
