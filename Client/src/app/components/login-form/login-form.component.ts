import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accounts } from 'src/app/accounts';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  accountList: accounts[] = [];
  title: string = 'Login Screen';
  username!: string;
  password!: string;
  constructor(public ls: LoginService, private router: Router) {}
  ngOnInit(): void {}
  toggleAddTask() {
    console.log('toggle123');
  }

  onSubmit() {
    this.ls
      .login({ username: this.username, password: this.password })
      .subscribe((r) => {
        if (r.token) {
          sessionStorage.setItem('amtelco_token', r.token);
          this.router.navigate(['appointment']);
        } else {
          if (!this.username || !this.password) {
            alert('Please enter your credentials into the given fields.');
            return;
          } else {
            alert('Invalid Credentials');
            return;
          }
        }
        //console.log(r);
      });
  }
  onLogOutClick() {
    this.ls.logOut();
  }
}
