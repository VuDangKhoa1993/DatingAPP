import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user/user.service';
import { AlertService } from '../../_service/alert/alert.service';
import { User } from '../../_model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.users = data['users'];
      this.alertService.success('load user successfully!');
    });
  }
}
