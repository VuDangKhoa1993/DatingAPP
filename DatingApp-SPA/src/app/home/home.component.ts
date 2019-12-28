import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isRegister = false;
  values: any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  registerToggle() {
    this.isRegister = !this.isRegister;
  }

  getValues() {
    this.httpClient.get('http://localhost:5000/api/values').subscribe(data => {
      this.values = data;
    });
  }

  cancelRegister(event) {
    this.isRegister = event;
  }
}
