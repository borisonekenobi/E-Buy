import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-buy',
  imports: [
    ProductComponent
  ],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})

export class BuyComponent {

  auction = 'buy';

  products = [
    {
      id: "1",
      name: 'Product 1',
      price: 100,
    },
    {
      id: "2",
      name: 'Product 2',
      price: 200,
    },
    {
      id: "3",
      name: 'Product 3',
      price: 300,
    }
  ];

}
