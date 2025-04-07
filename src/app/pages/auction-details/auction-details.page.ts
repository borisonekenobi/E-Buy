import {Component, inject, OnInit} from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule, Validators,
} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {ProductService} from '../../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../product';
import {Bid} from '../../bid';
import {APIResponse} from '../../apiresponse';

@Component({
  selector: 'app-auction-details',
  imports: [
    ReactiveFormsModule, NgForOf],
  templateUrl: './auction-details.page.html',
  styleUrl: './auction-details.page.css',
})
export class AuctionDetailsPage implements OnInit {
  productService: ProductService = inject(ProductService);

  product!: Product;
  bids!: Bid[];

  bidForm: FormGroup;
  showBidConfirmation = false;
  showBidSuccess = false;
  showBidFailure = false;
  bidError = '';
  bidAmount = 0;
  timeRemaining = '';
  nextMinBid: string = '0.00';

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getById(id).then((r) => {
      if ('message' in r) {
        console.log(r.message);
        return;
      }

      if (r.bids) {
        this.product = r;
        this.bids = r.bids;
        this.nextMinBid = r.bids.length > 0 ?
          (r.bids[0].price * 1.01).toFixed(2) :
          r.price.toFixed(2);
      }
    });

    this.bidForm = this.fb.group({
      bidAmount: [
        '', [
          Validators.required, Validators.min(parseFloat(this.nextMinBid))]],
    });
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    // this.productService.getById(this.productId).then(r => {
    //   if ('message' in r) {
    //     console.log(r.message);
    //     return;
    //   }
    //   this.auction = r as Product;
    // })


  }

  ngOnInit(): void {
    this.updateTimeRemaining();
    this.calculateNextMinBid();

    // Update time remaining every minute
    setInterval(() => {
      this.updateTimeRemaining();
    }, 1000 * 60);
  }

  getId(id: string): string {
    return id.substring(0, 4) + '...' + id.substring(id.length - 4);
  }

  updateTimeRemaining(): void {
    // const now = new Date();
    // const diff = this.product.endTime.getTime() - now.getTime();
    //
    // if (diff <= 0) {
    //   this.timeRemaining = 'Auction ended';
    //   return;
    // }
    //
    // const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    //
    // if (days > 0) {
    //   this.timeRemaining = `${days} days, ${hours} hours`;
    // } else if (hours > 0) {
    //   this.timeRemaining = `${hours} hours, ${minutes} minutes`;
    // } else {
    //   this.timeRemaining = `${minutes} minutes`;
    // }
  }

  calculateNextMinBid(): void {
    this.nextMinBid = this.bids.length > 0 ?
      (parseFloat(this.bids[0].price.toString()) * 1.01).toFixed(2) :
      this.product.price.toFixed(2);
  }

  onSubmit(): void {
    if (this.bidForm.invalid) {
      return;
    }

    this.bidAmount = this.bidForm.value.bidAmount;
    this.showBidConfirmation = true;
  }

  confirmBid(): void {
    this.showBidConfirmation = false;

    this.productService.bid(this.product, this.bidAmount).then(async (r) => {
      if (r.ok) {
        const res: APIResponse = await r.json();
        console.log(res.message);
        this.showBidSuccess = true;
      } else {
        const res: APIResponse = await r.json();
        this.bidError = res.message;
        this.showBidFailure = true;
      }
    });
  }

  cancelBid(): void {
    this.showBidConfirmation = false;
  }

  closeBidSuccess(): void {
    this.showBidSuccess = false;
    window.location.reload();
  }

  closeBidFailure(): void {
    this.showBidFailure = false;
  }

  protected readonly parseFloat = parseFloat;
}
