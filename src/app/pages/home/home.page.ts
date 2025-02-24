import { Component } from '@angular/core';
import {ProductComponent} from '../../components/product/product.component';

@Component({
  selector: 'app-home',
  imports: [
    ProductComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

}
