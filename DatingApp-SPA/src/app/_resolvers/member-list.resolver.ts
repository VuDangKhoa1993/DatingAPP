import { User } from './../_model/user';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '../_service/user/user.service';
import { AlertService } from '../_service/alert/alert.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertService.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}