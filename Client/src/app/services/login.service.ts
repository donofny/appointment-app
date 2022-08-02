import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface LoginResponse {
  token: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  getAuthToken() {
    return sessionStorage.getItem('amtelco_token');
  }
  constructor(private http: HttpClient) {}

  login(credential: { username: string; password: string }) {
    const url = 'http://localhost:3000/api/authenticate';
    const response = this.http.post(url, credential);
    return response as Observable<LoginResponse>;
  }
  logOut() {
    sessionStorage.removeItem('amtelco_token');
  }
  isLoggedIn() {
    const token = sessionStorage.getItem('amtelco_token');
    if (token) {
      const user = this.parseJwt(token);
      return this.isExpired(user.exp);
    } else {
      return false;
    }
  }
  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  isExpired(exp: number) {
    if (Date.now() >= exp * 1000) {
      return false;
    } else return true;
  }
}
