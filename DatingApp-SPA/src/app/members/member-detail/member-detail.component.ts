import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user/user.service';
import { of } from 'rxjs';
import { AlertService } from 'src/app/_service/alert/alert.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  userDetail: User;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => this.userDetail = data['user']);
  }
}
