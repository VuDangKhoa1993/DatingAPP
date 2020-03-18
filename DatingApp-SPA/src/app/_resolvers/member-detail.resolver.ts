import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../_model/user';
import { Observable, of } from 'rxjs';
import { UserService } from '../_service/user/user.service';
import { AlertService } from '../_service/alert/alert.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private router: Router,
        private alertService: AlertService
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
        return this.userService.getUserByid(route.params['id']).pipe(
            catchError(error => {
                this.alertService.error("Problem retrieving data");
                this.router.navigate(['/member']);
                return of(null);
            })
        )
    }
}