import {Component, inject} from '@angular/core';
import {ProductComponent} from '../../components/product/product.component';
import {NgForOf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../product.service';
import {Product} from '../../product';

@Component({
  selector: 'app-auction',
  imports: [ProductComponent, NgForOf],
  templateUrl: './auction.page.html',
  styleUrl: './auction.page.css',
})
export class AuctionPage {
  private route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);

  products: Product[] = [];

  constructor() {
    this.productService.get().then(r => {
      if ('message' in r) {
        console.log(r.message);
        return;
      }
      this.products = (r as Product[]).filter(product => product.type === 'auction');
    });
  }
}
