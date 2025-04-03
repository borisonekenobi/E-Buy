import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [
    NgIf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  productId: string = '';
  type: string = ''; // auction or buy

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.type = this.route.snapshot.url[0].path;
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProductData(this.productId);
  }

  loadProductData(id: string) {
    console.log('Loading product with ID:', id);
  }

}
