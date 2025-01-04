import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { User } from '../../Classes/user';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
onSubmit(_t2: any) {
throw new Error('Method not implemented.');
}
  loginService!: LoginService;
  constructor() {}
  register(username:string,email: string, password: string) {
    var u=new User(email, password);
    u.setUsername(username);
    this.loginService.register(u).subscribe(response => {
      console.log('Register successful', response);
      console.log(u.getEmail());
    }, error => {
      console.error('Register failed', error);
      console.log("mat3adech");
    });
  }

}
