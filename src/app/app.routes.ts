import {Routes} from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {AuctionComponent} from './pages/auction/auction.component';
import {BuyComponent} from './pages/buy/buy.component';

export const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'auction', component: AuctionComponent},
  {path: 'buy', component: BuyComponent},
];

