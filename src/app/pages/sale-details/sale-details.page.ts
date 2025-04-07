import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../product';
import {ProductService} from '../../product.service';
import {APIResponse} from '../../apiresponse';

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
    });
  }

  buyNow(): void {
    this.showAlert = true;
  }

  confirmPurchase(): void {
    this.purchaseComplete = true;
    this.showAlert = false;

    this.productService.buy(this.product).then(async (r) => {
      if (r.ok) {
        const res: APIResponse = await r.json();
        console.log(res.message);
        window.location.href = '/';
      } else {
        const res: APIResponse = await r.json();
        console.error(res.message);
        this.purchaseComplete = false;
        this.showAlert = true;
      }
    });
  }

  cancelPurchase(): void {
    this.showAlert = false;
  }
}
