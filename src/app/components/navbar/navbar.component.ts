import {Component, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {User} from '../../user';
import {Service} from '../../service';
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

  loggedIn!: boolean;
  user!: User;

  constructor() {
    this.loggedIn = !!localStorage.getItem('user');
    if (this.loggedIn) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  logout() {
    this.userService.logout();
    this.loggedIn = false;
    window.location.reload();
  }
}
