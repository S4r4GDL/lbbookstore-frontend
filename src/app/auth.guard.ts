import {inject, Injectable} from '@angular/core';
import {CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "./components/login/shared/login.service";

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.isAuthenticatedSubject.value) {
    router.navigate(['/login']);
    return false;
  }

  return loginService.isAuthenticatedSubject.value;
};
