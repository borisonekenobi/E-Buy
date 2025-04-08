import {Injectable} from '@angular/core';
import {Service} from './service';
import {APIResponse} from './apiresponse';
import {Product} from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends Service {
  readonly url = `${Service.host}/posts`;

  constructor() {
    super();
  }

  async create(post: Product): Promise<Response> {
    return await fetch(`${this.url}`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(post),
    });
  }

  async getSales(): Promise<Product[] | APIResponse> {
    const res = await fetch(`${this.url}/sale`, {
      method: 'GET', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async getAuctions(): Promise<Product[] | APIResponse> {
    const res = await fetch(`${this.url}/auction`, {
      method: 'GET', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async getById(id: string): Promise<Product | APIResponse> {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'GET', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async update(post: Product): Promise<APIResponse> {
    const res = await fetch(`${this.url}/${post.id}`, {
      method: 'PUT', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(post),
    });

    return await res.json();
  }

  async delete(id: string): Promise<APIResponse> {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'DELETE', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async buy(post: Product): Promise<Response> {
    return await fetch(`${this.url}/buy/${post.id}`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async bid(post: Product, amount: number): Promise<Response> {
    return await fetch(`${this.url}/bid/${post.id}`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({price: amount}),
    });
  }
}
