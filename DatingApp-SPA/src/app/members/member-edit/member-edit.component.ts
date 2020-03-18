import { AlertService } from './../../_service/alert/alert.service';
import { User } from './../../_model/user';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log(this.user);
    this.alertService.success('Updated user successful');
    this.editForm.reset(this.user);
  }
}
