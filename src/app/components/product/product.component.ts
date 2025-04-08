import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Product} from '../../product';

@Component({
  selector: 'app-product',
  imports: [
    RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})

export class ProductComponent {
  @Input() product!: Product;
  price: string = '0.00';

  ngOnInit() {
    this.price = parseFloat(this.product.price.toString()).toFixed(2);
  }
}
