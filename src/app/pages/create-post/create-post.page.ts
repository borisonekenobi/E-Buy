import {Component, inject} from '@angular/core';
import {ProductService} from '../../product.service';
import {Product} from '../../product';

@Component({
  selector: 'app-create-post',
  imports: [],
  templateUrl: './create-post.page.html',
  styleUrl: './create-post.page.css',
})

export class CreatePostPage {
  productService: ProductService = inject(ProductService);
  isValidTitle: boolean = false;
  isValidCategory: boolean = false;
  isValidPrice: boolean = false;
  isValidDescription: boolean = false;

  constructor() {
    if (!localStorage.getItem('user')) {
      window.location.href = '/login';
    }
  }

  onSubmit() {
    this.validateTitle();
    this.validateCategory();
    this.validatePrice();
    this.validateDescription();

    if (!this.isValidTitle || !this.isValidCategory || !this.isValidPrice ||
      !this.isValidDescription) {
      return;
    }

    const title = (document.getElementById('title')! as HTMLInputElement).value;
    const category = (document.getElementById('category')! as HTMLSelectElement).value;
    const price = (document.getElementById('price')! as HTMLInputElement).value;
    const description = (document.getElementById('description')! as HTMLInputElement).value;

    if (category !== 'auction' && category !== 'sale') {
      return;
    }

    console.log(title);

    const post: Product = {
      id: '',
      user_id: JSON.parse(localStorage.getItem('user')!).id,
      title: title,
      description: description,
      price: parseFloat(price),
      type: category,
      status: 'active',
    }

    this.productService.create(post).then(async r => {
      if (r.ok) {
        window.location.href = '/';
      } else {
        const res = await r.json();
        document.getElementById('error')!.innerHTML = res.message;
        return;
      }
    });
  }

  validateTitle() {
    const title = document.getElementById('title')! as HTMLInputElement;
    this.isValidTitle = title.value.length > 0;
    if (!this.isValidTitle) {
      title.classList.add('invalid');
    } else {
      title.classList.remove('invalid');
    }
  }

  validateCategory() {
    const category = document.getElementById('category')! as HTMLSelectElement;
    this.isValidCategory = category.value == 'auction' || category.value == 'sale';
    if (!this.isValidCategory) {
      category.parentElement?.classList.add('invalid');
    } else {
      category.parentElement?.classList.remove('invalid');
    }
  }

  validatePrice() {
    const price = document.getElementById('price')! as HTMLInputElement;
    const priceValue = parseFloat(price.value);
    this.isValidPrice = 0 <= priceValue && priceValue <= 1_000_000;
    if (!this.isValidPrice) {
      price.classList.add('invalid');
    } else {
      price.classList.remove('invalid');
    }
  }

  validateDescription() {
    const description = document.getElementById(
      'description')! as HTMLInputElement;
    this.isValidDescription = description.value.length > 0;
    if (!this.isValidDescription) {
      description.classList.add('invalid');
    } else {
      description.classList.remove('invalid');
    }
  }
}
