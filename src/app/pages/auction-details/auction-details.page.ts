import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  FormBuilder, FormGroup, ReactiveFormsModule, Validators,
} from '@angular/forms';
import {NgForOf} from '@angular/common';

interface Bid {
  bidder: string;
  amount: number;
  timestamp: string;
}

@Component({
  selector: 'app-auction-details',
  imports: [
    ReactiveFormsModule, NgForOf],
  templateUrl: './auction-details.page.html',
  styleUrl: './auction-details.page.css',
})
export class AuctionDetailsPage implements OnInit {
  auction = {
    id: 1,
    name: 'Professional DSLR Camera',
    description: 'High-end professional DSLR camera with 45.7 megapixels, 4K video recording, and exceptional low-light performance. Includes 24-70mm f/2.8 lens, battery grip, and extra battery. Perfect for professional photographers and serious enthusiasts.',
    image: 'https://via.placeholder.com/500x500',
    currentBid: 1850,
    minBidIncrement: 25,
    endTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 2 days, 4 hours from now
    totalBids: 23,
    details: {
      seller: 'ProPhotoGear (Rating: 4.9/5)',
    },
  };

  bidHistory: Bid[] = [
    {bidder: 'user****78', amount: 1850, timestamp: 'Apr 1, 2025 - 3:45 PM'},
    {bidder: 'photo****21', amount: 1825, timestamp: 'Apr 1, 2025 - 2:30 PM'},
    {bidder: 'camera****55', amount: 1800, timestamp: 'Mar 31, 2025 - 8:15 PM'},
    {bidder: 'user****78', amount: 1775, timestamp: 'Mar 31, 2025 - 6:20 PM'},
    {bidder: 'photo****21', amount: 1750, timestamp: 'Mar 31, 2025 - 4:10 PM'}];

  bidForm: FormGroup;
  showBidConfirmation = false;
  showBidSuccess = false;
  bidAmount = 0;
  timeRemaining = '';
  nextMinBid = 0;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.bidForm = this.fb.group({
      bidAmount: [
        '', [
          Validators.required,
          Validators.min(
            this.auction.currentBid + this.auction.minBidIncrement)]],
    });
  }

  ngOnInit(): void {
    this.updateTimeRemaining();
    this.calculateNextMinBid();

    // Update time remaining every minute
    setInterval(() => {
      this.updateTimeRemaining();
    }, 60000);
  }

  updateTimeRemaining(): void {
    const now = new Date();
    const diff = this.auction.endTime.getTime() - now.getTime();

    if (diff <= 0) {
      this.timeRemaining = 'Auction ended';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      this.timeRemaining = `${days} days, ${hours} hours`;
    } else if (hours > 0) {
      this.timeRemaining = `${hours} hours, ${minutes} minutes`;
    } else {
      this.timeRemaining = `${minutes} minutes`;
    }
  }

  calculateNextMinBid(): void {
    this.nextMinBid = this.auction.currentBid + this.auction.minBidIncrement;
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

    // In a real app, you would send the bid to the server here

    // Update the UI to reflect the new bid
    this.auction.currentBid = this.bidAmount;
    this.auction.totalBids++;
    this.calculateNextMinBid();

    // Add the new bid to the history
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    this.bidHistory.unshift({
      bidder: 'You', amount: this.bidAmount, timestamp: timestamp,
    });

    // Reset the form
    this.bidForm.reset();

    // Show success message
    this.showBidSuccess = true;
  }

  cancelBid(): void {
    this.showBidConfirmation = false;
  }

  closeBidSuccess(): void {
    this.showBidSuccess = false;
  }
}
