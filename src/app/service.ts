export abstract class Service {
  readonly host: string = 'http://35.222.166.34:3000/api';

  static logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
