import { AlertService } from './../_service/alert/alert.service';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../_model/user';
import { AuthService } from '../_service/auth/auth.service';
import { UserService } from '../_service/user/user.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(
        private authService: AuthService,
        private usereService: UserService,
        private alertService: AlertService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        const userId = this.authService.decodedToken.nameid;
        return this.usereService.getUserByid(userId).pipe(
            catchError(error => {
                this.alertService.error('Problem retrieving data');
                this.router.navigate(['/member']);
                return of(null);
            })
        );
    }
}