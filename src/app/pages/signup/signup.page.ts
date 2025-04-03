import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.css',
})

//TODO: add alert to let users signup successfully


export class SignUpPage {
  userService: UserService = inject(UserService);
  isValidName: boolean = false;
  isValidUsername: boolean = false;
  isValidPassword: boolean = false;

  constructor() {
  }

  onSubmit() {
    this.validateName();
    this.validateUsername();
    this.validatePassword();

    if (!this.isValidName || !this.isValidUsername ||
      !this.isValidPassword) return;

    const name = (document.getElementById('name')! as HTMLInputElement).value;
    const username = (document.getElementById(
      'username')! as HTMLInputElement).value;
    const password = (document.getElementById(
      'password')! as HTMLInputElement).value;

    this.userService.signUp(name, username, password).then(async r => {
      if (r.ok) {
        window.location.href = '/login';
      } else {
        const res = await r.json();
        const error = document.getElementById('error')! as HTMLDivElement;
        error.innerText = res.message;
        error.classList.remove('hidden');
      }
    });
  }

  validateName() {
    const name = document.getElementById('name')! as HTMLInputElement;
    this.isValidName = name.value.length > 0;
    if (!this.isValidName) {
      name.classList.add('invalid');
    } else {
      name.classList.remove('invalid');
    }
  }

  validateUsername() {
    const nickname = document.getElementById('username')! as HTMLInputElement;
    this.isValidUsername = nickname.value.length > 0;
    if (!this.isValidUsername) {
      nickname.classList.add('invalid');
    } else {
      nickname.classList.remove('invalid');
    }
  }

  validatePassword() {
    const password = document.getElementById('password')! as HTMLInputElement;
    this.isValidPassword = password.value.length > 0;
    if (!this.isValidPassword) {
      password.classList.add('invalid');
    } else {
      password.classList.remove('invalid');
    }
  }
}
