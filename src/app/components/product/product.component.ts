import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    NgForOf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
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

  details(id : string) {
    console.log('Product ID:', id);
  }
}
