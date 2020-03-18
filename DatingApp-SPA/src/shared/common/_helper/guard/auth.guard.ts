import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_service/auth/auth.service';
import { AlertService } from 'src/app/_service/alert/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.authService.loggedIn();
    if (isLogged) {
      return true;
    }
    this.alertService.error('You shall not pass !');
    // navigate to login page
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
