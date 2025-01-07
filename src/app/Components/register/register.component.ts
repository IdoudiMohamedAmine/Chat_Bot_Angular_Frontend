import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { User } from '../../Classes/user';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerform:FormGroup;
  loginService: LoginService;
  constructor(private router: Router, loginService: LoginService) {
    this.registerform = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.loginService = loginService;
  }

  register() {
    const u= new User(this.registerform.value.email!, this.registerform.value.password!);
    u.setUsername(this.registerform.value.username!);
    this.loginService.register(u).subscribe((response: any) => {
      if (response==null) {
        alert('Registration failed user already exists'); 
        this.router.navigate(['/register'],);
      }
      console.log('Registration successful', response);
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
    console.error('Registration failed', error);
  }
  );
}
}