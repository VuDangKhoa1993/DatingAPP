import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth/auth.service';
import { AlertService } from '../_service/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() valueSources: any;
  @Output() cancelRegisterEvent = new EventEmitter();
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  register() {
    const params = this.form.value;
    this.authService.register(params).subscribe(res => {
      this.cancelRegisterEvent.emit();
    }, error => {
      this.alertService.error(error);
    });
  }

  cancelRegister() {
    this.cancelRegisterEvent.emit(false);
  }

}