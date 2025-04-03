import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-buy-details',
  imports: [],
  templateUrl: './buy-details.component.html',
  styleUrl: './buy-details.component.css'
})

//TODO: add authentication to the purchase process

export class BuyDetailsComponent implements OnInit {
  //purchase confirmation
  showAlert = false;
  purchaseComplete = false;

  productId: string = '';
  type: string = ''; // auction or buy

  product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions. Perfect for music lovers, gamers, and professionals alike.',
    price: 249.99,
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.url[0].path;
    this.productId = this.route.snapshot.paramMap.get('id') || '';

  }

  buyNow(): void {
    this.showAlert = true;
  }

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
