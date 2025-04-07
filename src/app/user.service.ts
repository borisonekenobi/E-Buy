import {Injectable} from '@angular/core';
import {Service} from './service';
import {User} from './user';
import {APIResponse} from './apiresponse';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Service {
  static readonly tokenRenewTime: number = 1000 * 60 * 30; // 30 minutes
  static tokenRenewalInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();

    if (localStorage.getItem('user')) {
      this.startTokenRenewal();
    }
  }

  async signIn(
    username: string, password: string): Promise<User | APIResponse> {
    const res = await fetch(`${Service.host}/sign-in`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({username, password}),
    });

    const data = await res.json();
    if ('user' in data) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    if ('access' in data) {
      localStorage.setItem('access', data.access);
    }
    if ('refresh' in data) {
      localStorage.setItem('refresh', data.refresh);
    }

    if ('user' in data) {
      this.startTokenRenewal();
      return data.user;
    } else {
      return data;
    }
  }

  async changePassword(
    username: string, oldPassword: string,
    newPassword: string): Promise<APIResponse> {
    const res = await fetch(`${Service.host}/change-password`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }, body: JSON.stringify({username, oldPassword, newPassword}),
    });

    return await res.json();
  }

  async signUp(
    name: string, username: string, password: string): Promise<Response> {
    return await fetch(`${Service.host}/sign-up`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({name, username, password}),
    });
  }

  async renewTokens(): Promise<APIResponse | {
    access: string, refresh: string
  }> {
    const res = await fetch(`${Service.host}/renew-tokens`, {
      method: 'POST', headers: {
        'Authorization': `Bearer ${localStorage.getItem('refresh')}`,
      },
    });

    const data = await res.json();
    if ('access' in data) {
      localStorage.setItem('access', data.access);
    }
    if ('refresh' in data) {
      localStorage.setItem('refresh', data.refresh);
    }

    return data;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  private startTokenRenewal() {
    this.renewTokens().then(() => {
      UserService.tokenRenewalInterval = setInterval(() => {
        this.renewTokens().then((r) => {
          if ('message' in r) {
            console.log(r.message);
          }
        });
      }, UserService.tokenRenewTime);
    });
  }
}
