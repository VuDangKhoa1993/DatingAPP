import { AlertService } from './../_service/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_service/auth/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    };
    const params = this.form.value;
    this.authService.login(params).subscribe(res => {
      if (res) {
        this.alertService.success('logged in successfully!');
      }
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.activatedRoute.queryParams
      .subscribe(data => {
        if (data.returnUrl) {
          this.router.navigateByUrl(data.returnUrl);
        } else {
          this.router.navigate(['/member']);
        }
      });
    });
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/home']);
    this.alertService.warning('logged out');
  }
}
