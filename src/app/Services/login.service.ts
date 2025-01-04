import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Url: string = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient) { }
  login(user: User) {
    return this.http.post(this.Url + "/login", { email: user.getEmail(), password: user.getPassword() }); 
  }
  register(user: User) {
    return this.http.post(this.Url + "/register", { email: user.getEmail(), password: user.getPassword(), username: user.getUsername() });
  }
  getUserByEmail(email: string) {
    return this.http.get<User>(this.Url + '/get/' + email);
  }
}