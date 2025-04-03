export abstract class Service {
  readonly host: string = 'http://localhost:3000/api';

  static logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
