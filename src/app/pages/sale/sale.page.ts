import {Component, inject} from '@angular/core';
import {ProductComponent} from '../../components/product/product.component';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from '../../product';
import {ProductService} from '../../product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sale',
  imports: [
    ProductComponent, NgForOf, NgIf],
  templateUrl: './sale.page.html',
  styleUrl: './sale.page.css',
})

export class SalePage {
  private route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);

  products: Product[] = [];
  sale: Product[] = [];

  constructor() {
    this.productService.get().then(r => {
      if ('message' in r) {
        console.log(r.message);
        return;
      }
      this.products = (r as Product[]).filter(product => product.type === 'sale');
    });
  }
}
