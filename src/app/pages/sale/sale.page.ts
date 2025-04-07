import {Component, inject} from '@angular/core';
import {ProductComponent} from '../../components/product/product.component';
import {NgForOf} from '@angular/common';
import {Product} from '../../product';
import {ProductService} from '../../product.service';

@Component({
  selector: 'app-sale',
  imports: [
    ProductComponent, NgForOf],
  templateUrl: './sale.page.html',
  styleUrl: './sale.page.css',
})

export class SalePage {
  productService: ProductService = inject(ProductService);
  products: Product[] = [];

  constructor() {
    this.productService.getSales().then(r => {
      if ('message' in r) {
        console.log(r.message);
        return;
      }

      this.products = r as Product[];
    });
  }
}
