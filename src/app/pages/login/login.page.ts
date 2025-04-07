import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-login', imports: [
    RouterLink], templateUrl: './login.page.html', styleUrl: './login.page.css',
})


export class LoginPage {
  userService: UserService = inject(UserService);
  isValidUsername: boolean = false;
  isValidPassword: boolean = false;

  constructor() {
  }

  onSubmit() {
    this.validateUsername();
    this.validatePassword();

    if (!this.isValidUsername || !this.isValidPassword) return;

    const username = (document.getElementById(
      'username')! as HTMLInputElement).value;
    const password = (document.getElementById(
      'password')! as HTMLInputElement).value;

    console.log(username, password);

    this.userService.signIn(username, password).then(async r => {
      if ('message' in r) {
        const error = document.getElementById('error')! as HTMLDivElement;
        error.innerText = r.message;
        error.classList.remove('hidden');
      } else {
        window.location.href = '/';
      }
    });
  }

  validateUsername() {
    const username = document.getElementById('username')! as HTMLInputElement;
    this.isValidUsername = username.value.length > 0;
    if (!this.isValidUsername) {
      username.classList.add('invalid');
    } else {
      username.classList.remove('invalid');
    }
  }

  validatePassword() {
    const password = document.getElementById('password')! as HTMLInputElement;
    console.log(password);
    this.isValidPassword = password.value.length > 0;
    if (!this.isValidPassword) {
      password.classList.add('invalid');
    } else {
      password.classList.remove('invalid');
    }
  }
}
