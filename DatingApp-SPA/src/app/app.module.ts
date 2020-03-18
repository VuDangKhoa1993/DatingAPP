import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValueComponent } from './value/value.component';
import { ErrorInterceptor } from 'src/shared/common/_helper/error.interceptor';
import { NavComponent } from './nav/nav.component';
import { ServiceModule } from './_service/service/service.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AuthGuard } from 'src/shared/common/_helper/guard/auth.guard';
import { PreventUnsavedChangesGuard } from 'src/shared/common/_helper/guard/prevent-unsaved-changes.guard';

export function tokenGetter() {
   const userInfo = localStorage.getItem('userInfo');
   if (userInfo) {
      return JSON.parse(userInfo).token;
   }
   return null;
}

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ServiceModule,
      ReactiveFormsModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line: object-literal-shorthand
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['http://localhost:5000/api/auth/']
         }
      }),
      TabsModule.forRoot()
   ],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptor,
         multi: true
      },
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      AuthGuard,
      PreventUnsavedChangesGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
