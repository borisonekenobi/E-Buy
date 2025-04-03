import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    NgForOf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {

  //receive data from auction or buy page to set which one to display
  @Input() type: string = '';
  @Input() data: any;


  details(id : string) {
    console.log('Product ID:', id);
  }

}
