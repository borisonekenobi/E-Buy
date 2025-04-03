import {Injectable} from '@angular/core';
import {Service} from './service';
import {User} from './user';
import {APIResponse} from './apiresponse';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Service {
  constructor() {
    super();
  }

  async signIn(
    username: string, password: string): Promise<User | APIResponse> {
    const res = await fetch(`${this.host}/sign-in`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({username, password}),
    });

    // TODO: call this.renewTokens() every 30 minutes

    const data = await res.json();
    if ('user' in data) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    if ('access' in data) {
      localStorage.setItem('access', JSON.stringify(data.access));
    }
    if ('refresh' in data) {
      localStorage.setItem('refresh', JSON.stringify(data.refresh));
    }

    if ('user' in data) return data.user; else return data;
  }

  async changePassword(
    username: string, oldPassword: string,
    newPassword: string): Promise<APIResponse> {
    const res = await fetch(`${this.host}/change-password`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }, body: JSON.stringify({username, oldPassword, newPassword}),
    });

    return await res.json();
  }

  async signUp(
    name: string, username: string, password: string): Promise<Response> {
    return await fetch(`${this.host}/sign-up`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({name, username, password}),
    });
  }

  async renewTokens(): Promise<APIResponse | {
    access: string, refresh: string
  }> {
    const res = await fetch(`${this.host}/renew-tokens`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${localStorage.getItem('refresh')}`,
      },
    });

    const data = await res.json();
    if ('access' in data) {
      localStorage.setItem('access', JSON.stringify(data.access));
    }
    if ('refresh' in data) {
      localStorage.setItem('refresh', JSON.stringify(data.refresh));
    }

    return data;
  }
}
