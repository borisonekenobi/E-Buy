import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {LoginPage} from './pages/login/login.page';
import {SignUpPage} from './pages/signup/signup.page';
import {CreatePostPage} from './pages/create-post/create-post.page';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'signup', component: SignUpPage},
  {path: 'create-post', component: CreatePostPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
