import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-sale-details',
  imports: [],
  templateUrl: './sale-details.page.html',
  styleUrl: './sale-details.page.css',
})

export class SaleDetailsPage {
  productService: ProductService = inject(ProductService);

  showAlert = false;
  purchaseComplete = false;

  product!: Product;
  price: string = '0.00';

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getById(id).then((r) => {
      if ('message' in r) {
        console.log(r.message);
        return;
      }

      this.product = r;
      this.price = parseFloat(this.product.price.toString()).toFixed(2);
    })
  }

  buyNow(): void {
    this.showAlert = true;
  }

  confirmPurchase(): void {
    this.purchaseComplete = true;
    this.showAlert = false;

    this.productService.buy(this.product).then((r) => {
      console.log(r.message);
      window.location.href = '/';
    })
  }

  cancelPurchase(): void {
    this.showAlert = false;
  }
}
