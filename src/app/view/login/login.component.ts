import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {UserDTO} from '../../dto/userDTO';
import {LoginModel} from './login.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: LoginModel = new LoginModel();
  registerForm: FormGroup;
  loginForm: FormGroup;
  name: string;
  usertype: string;
  userName: string;
  password: string;
  hide = true;

  constructor(private formBuilder: FormBuilder,
              private authservice: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'name': [this.user.username, [
        Validators.required
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]]
    });
  }

  onRegisterSubmit() {
    alert(this.user.username + ' ' + this.user.password);
  }

  login(): void {
    this.authservice.login('' + this.userName, '' + this.password).subscribe(
      (result) => {
        console.log('login component result' + JSON.stringify(result));
        if (result) {
          sessionStorage.setItem('token', JSON.stringify(result));
          console.log('login component result if ' + JSON.stringify(sessionStorage.getItem('token')));
          this.usertype = result.usertype;
          if (this.usertype === 'ADMIN') {
            this.router.navigate(['/admin-main/admin-dashboard']);
          } else {
            this.router.navigate(['/main/dashboard']);
          }
          return true;
        } else {
          alert('Login Failed');
          return false;
        }
      }
    );
  }
}
