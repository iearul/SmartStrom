import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../services/login.service';

@Component({
  selector :  'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  currentPath : any =  null;

  constructor(
    private router: Router,
    private _authenticationService: loginService
  ) { }

  ngOnInit(): void {
    this.currentPath = this.router.url
    const currentUser = this._authenticationService.getUserData();

    if (currentUser && currentUser.role == 'Admin') {
      this.isAdmin = true;
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  gotoProduct(){
    this.router.navigate(['product']);
  }

  gotoHome(){
    this.router.navigate(['calculator']);
  }

}
