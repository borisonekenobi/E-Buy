import {Component, inject, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../product.service';
import {Product} from '../../product';

@Component({
  selector: 'app-sale-details',
  imports: [],
  templateUrl: './sale-details.page.html',
  styleUrl: './sale-details.page.css',
})

//TODO: add authentication to the purchase process

export class SaleDetailsPage{
  //purchase confirmation
  showAlert = false;
  purchaseComplete = false;

  productId: string = '';
  type: string = ''; // auction or sale

  productService: ProductService = inject(ProductService);

  product = {} as Product;

  constructor(private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.productService.getById(this.productId).then(r => {
      if ('message' in r) {
        console.log(r.message);
        return;
      }
      this.product = r as Product;
    })
  }

  buyNow(): void {
    this.showAlert = true;
  }

  //TODO: make sure user is logged in
  confirmPurchase(): void {
    this.purchaseComplete = true;
    this.showAlert = false;
    setTimeout(() => {
      this.purchaseComplete = false;
    }, 3000);
  }

  cancelPurchase(): void {
    this.showAlert = false;
  }
}
