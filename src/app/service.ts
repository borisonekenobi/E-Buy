export abstract class Service {
  readonly host: string = 'http://34.30.39.206:3000/api';

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
