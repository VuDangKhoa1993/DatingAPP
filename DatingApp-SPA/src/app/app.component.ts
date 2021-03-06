import { Component, OnInit } from '@angular/core';
import { AuthService } from './_service/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DatingApp-SPA';
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      const token = userInfo.token;
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
