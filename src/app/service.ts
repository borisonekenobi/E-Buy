export abstract class Service {
  static readonly host: string = 'http://34.57.234.45:3000/api';
  static readonly tokenRenewTime: number = 1000 * 60 * 30; // 30 minutes
  static tokenInterval: NodeJS.Timeout | null;

  static logout(): void {
    this.tokenInterval = null;
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
