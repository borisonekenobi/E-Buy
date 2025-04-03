import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {AuctionPage} from './pages/auction/auction.page';
import {BuyPage} from './pages/buy/buy.page';
import {LoginPage} from './pages/login/login.page';
import {SignUpPage} from './pages/signup/signup.page';
import {CreatePostPage} from './pages/create-post/create-post.page';
import {BuyDetailsPage} from './pages/buy-details/buy-details.page';
import {
  AuctionDetailsPage,
} from './pages/auction-details/auction-details.page';

import {ProfilePage} from './pages/profile/profile.page';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'signup', component: SignUpPage},
  {path: 'profile', component: ProfilePage},
  {path: 'create-post', component: CreatePostPage},
  {path: 'auction', component: AuctionPage},
  {path: 'auction/product/:id', component: AuctionDetailsPage},
  {path: 'buy', component: BuyPage},
  {path: 'buy/product/:id', component: BuyDetailsPage}];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule],
})
export class AppRoutingModule {
}
