import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loggedIn = false;
  //something from the backend not sure yet
  user = {
    name: 'John Doe',
    age: 30,
    id: 1
  }

  logout() {
    //some code here to send to the backend
    console.log('Logout clicked');
    this.loggedIn = false;
  }


}
