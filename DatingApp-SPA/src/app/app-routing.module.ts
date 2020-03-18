import { MessagesComponent } from './messages/messages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from 'src/shared/common/_helper/guard/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from 'src/shared/common/_helper/guard/prevent-unsaved-changes.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '', // localhost:4200/member
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'member', component: MemberListComponent, resolve: { users: MemberListResolver } },
      { path: 'message', component: MessagesComponent },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: {
          user: MemberEditResolver
        },
        canDeactivate: [PreventUnsavedChangesGuard]
      },
      { path: 'user/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
      { path: 'list', component: ListsComponent },
      { path: '', redirectTo: 'member', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
