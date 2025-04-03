import {Injectable} from '@angular/core';
import {Service} from './service';
import {APIResponse} from './apiresponse';
import {Post} from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService extends Service {
  readonly url = `${this.host}/posts`;

  constructor() {
    super();
  }

  async create(post: Post): Promise<APIResponse> {
    const res = await fetch(`${this.url}`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(post),
    });

    return await res.json();
  }

  async get(): Promise<Post[] | APIResponse> {
    const res = await fetch(`${this.url}`, {
      method: 'GET', headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async getById(id: string): Promise<Post | APIResponse> {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'GET', headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async update(post: Post): Promise<APIResponse> {
    const res = await fetch(`${this.url}/${post.id}`, {
      method: 'PUT', headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(post),
    });

    return await res.json();
  }

  async delete(id: string): Promise<APIResponse> {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'DELETE', headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async buy(post: Post): Promise<APIResponse> {
    const res = await fetch(`${this.url}/buy/${post.id}`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async bid(post: Post, amount: number): Promise<APIResponse> {
    const res = await fetch(`${this.url}/bid/${post.id}`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({price: amount}),
    });

    return await res.json();
  }
}
