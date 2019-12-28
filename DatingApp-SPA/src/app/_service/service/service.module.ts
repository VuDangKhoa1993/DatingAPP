import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../base/data.service';
import { AuthService } from '../auth/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  providers: [
    AuthService,
    DataService
  ]
})
export class ServiceModule { }
