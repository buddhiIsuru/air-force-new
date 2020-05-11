import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {UserDTO} from '../../dto/userDTO';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: UserDTO = new UserDTO();
  userName: string;
  password: string;
  confirmpassword: string;
  searchTXT: string;
  name: string;
  telnumber: number;
  addUserForm: FormGroup;
  allUserList: Array<UserDTO> = [];
  userList: MatTableDataSource<any>;
  displayedColumns = ['name', 'userName', 'number', 'userType'];
  hide = true;

  constructor(
    private useserService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.getAllUser('', 0, 0);
  }

  ngOnInit() {

    this.addUserForm = this.formBuilder.group({
        'userName': [this.user.username, [Validators.required]],
        'name': [this.user.name, [Validators.required]],
        'password': [this.user.password, [Validators.required]],
        'confirmpassword': [this.user.confirmpassword, [Validators.required]],
        'userNumber': [this.user.number, [Validators.required]],
      }, {validator: this.checkPasswords});
  }

  confirmPassword() {

    if (this.password !== this.confirmpassword) {
      this.addUser();
    }
  }

  addUser() {
    // this.user.username = this.userName;
    // this.user.password = this.password;
    // this.user.number = this.telnumber;
    // this.user.name = this.name;
    this.user.usertype = 'USER';
    this.useserService.addUser(this.user).subscribe(result => {
      if (result) {
        alert('User Added Success');
      } else {
        alert('User Added Fail');
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
      ? null : {'mismatch': true};
  }

  getAllUser(text: string, count: number, page: number) {
    this.useserService.getAllUser(text, count, page).subscribe(result => {
      this.allUserList = result;
      console.log('================' + JSON.stringify(result));
      this.userList = new MatTableDataSource(this.allUserList);
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : {notSame: true};
  }


}
