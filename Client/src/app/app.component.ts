import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public ls: LoginService, public router: Router) {}
  onLogOutClick() {
    this.ls.logOut();
    this.router.navigate(['/']);
  }
}
