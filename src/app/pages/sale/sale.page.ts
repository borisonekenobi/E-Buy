import {Component, inject} from '@angular/core';
import {ProductComponent} from '../../components/product/product.component';
import {NgForOf} from '@angular/common';
import {Product} from '../../product';
import {ProductService} from '../../product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sale',
  imports: [
    ProductComponent, NgForOf],
  templateUrl: './sale.page.html',
  styleUrl: './sale.page.css',
})

export class SalePage {
  private route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);

  products: Product[] = [
    {
      id: '1',
      user_id: '1',
      title: 'Product 1',
      description: 'Description of product 1',
      price: 100,
      type: 'sale',
      status: 'active',
    }, {
      id: '2',
      user_id: '2',
      title: 'Product 2',
      description: 'Description of product 2',
      price: 200,
      type: 'sale',
      status: 'active',
    }, {
      id: '3',
      user_id: '3',
      title: 'Product 3',
      description: 'Description of product 3',
      price: 300,
      type: 'sale',
      status: 'active',
    }];

  constructor() {
    this.productService.get().then(r => {
      if ('message' in r) {
        console.log(r.message);
        return;
      }

      this.products = r as Product[];
    });
  }
}
