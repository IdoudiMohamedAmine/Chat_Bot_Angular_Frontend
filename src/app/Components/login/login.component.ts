import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { User } from '../../Classes/user';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface LoginResponse {
  email: string;
  password: string;
  id: string;
  username: string;
}
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform:FormGroup;
  loginService: LoginService;
  router: Router;

  constructor(loginService: LoginService, router: Router) {
    this.loginform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.loginService = loginService;
    this.router = router;
  }
  logIn() {
    const u = new User(this.loginform.value.email!, this.loginform.value.password!);
    this.loginService.login(u).subscribe((response: any) => {
      console.log('Login successful', response);
      const userResponse = new User(response.email, response.password);
      userResponse.setId(response.id);
      userResponse.setUsername(response.username);
      this.router.navigate(['/home'], {
        queryParams: {
          email: u.getEmail(),
          password: u.getPassword(),
          username: userResponse.getUsername(),
          id: userResponse.getId()
        }
      });
    }, error => {
      console.error('Login failed', error);
    });
  }
}
