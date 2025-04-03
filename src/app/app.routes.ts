import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {AuctionComponent} from './pages/auction/auction.component';
import {BuyComponent} from './pages/buy/buy.component';
import {LoginPage} from './pages/login/login.page';
import {SignUpPage} from './pages/signup/signup.page';
import {CreatePostPage} from './pages/create-post/create-post.page';
import {BuyDetailsComponent} from './pages/buy-details/buy-details.component';
import {AuctionDetailsComponent} from './pages/auction-details/auction-details.component';

import {ProfilePage} from './pages/profile/profile.page';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'signup', component: SignUpPage},
  {path: 'profile', component: ProfilePage},
  {path: 'create-post', component: CreatePostPage},
  {path: 'auction', component: AuctionComponent},
  {path: 'auction/product/:id', component: AuctionDetailsComponent},
  {path: 'buy', component: BuyComponent},
  {path: 'buy/product/:id', component: BuyDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
