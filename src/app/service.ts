export abstract class Service {
  readonly host: string = 'http://34.57.234.45:3000/api';

  static logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
