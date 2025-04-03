import {Component, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {
  userService: UserService = inject(UserService);
  loggedIn = false;
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor() {
    this.checkLogin();
  }

  checkLogin() {
    if(localStorage.getItem('user')!=null){
      this.loggedIn = true;
    }
  }

  logout() {
    this.userService.logout();
    this.loggedIn = false;
    window.location.reload();
  }
}
