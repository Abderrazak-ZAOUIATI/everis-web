import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LogoutComponent} from './components/logout/logout.component';
import {SignupComponent} from './components/signup/signup.component';
import {ConfirmAccountComponent} from './components/confirm-account/confirm-account.component';
import {ArticleComponent} from './components/article/article.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'account-confirm',component:ConfirmAccountComponent},
  {path:'logout',component:LogoutComponent},
  {path:'articles',component:ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
