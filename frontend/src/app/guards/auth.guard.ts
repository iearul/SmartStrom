import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { loginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _authenticationService: loginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this._authenticationService.getUserData();

      if (currentUser) {

        if(currentUser.role != 'Admin'){
          this._router.navigate(['calculator']);
          return false;
        }
        return true;

      }

      // not logged in so redirect to login page with the return url
      this._router.navigate(['login']);
      return false;
  }

}
