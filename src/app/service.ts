export abstract class Service {
  readonly host: string = 'http://35.222.166.34:3000/api/';

  logout(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
  }
}
