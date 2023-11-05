import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { FrontendService } from '../services/frontend.service';
import { Router } from '@angular/router';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  get form() { return this.userLoginForm.controls; }
  errors: any;
  isPopUp: any = false;

  constructor(
    private router: Router,
    private frontendService: FrontendService,
    private login: loginService,
    private fb: FormBuilder
  ) {
    this.userLoginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const currentUser = this.login.getUserData();
    if (currentUser ) {
      this.router.navigate(['product']);
    }
  }

  logIn() {
    if (this.userLoginForm.valid) {
      this.errors = '';
      this.frontendService.login(this.userLoginForm.value).subscribe(
        (resp) => {
          if(resp.status && resp.status == 200){

            this.login.storeUserToken(resp.body.data.token);
            this.login.storeUserId(resp.body.data.id);
            this.login.storeUser(resp.body.data);
            this.router.navigate(['product']);
          }
        },
        (err) => {
          this.errors = err.error.errors[0]['title'];
          console.log(err);
        }
      );
    }
  }

}
