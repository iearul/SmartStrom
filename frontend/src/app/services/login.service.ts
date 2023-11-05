import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class loginService {
    userDetails: any;

    constructor(

        ) { }

    storeUserToken(token:any) {
        sessionStorage.setItem('token', token);

    }

    getUserToken() {

        return sessionStorage.getItem('token');
    }

    isAdmin() {
      const userString = sessionStorage.getItem('user');

      if (userString) {
        try {
          const user = JSON.parse(userString);

          if (user && user.isAdmin === true) {
            return true;
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }

      return false;
    }

    storeUser(user:any) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }


    storeUserId(id:any) {
        sessionStorage.setItem('id', id);
    }

    getUserData = () => {
      const userInfoString = sessionStorage.getItem('user');

      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);
          return userInfo;
        } catch (error) {
          console.error('Error parsing userInfo data:', error);
        }
      }

      // If there's an issue with the data or it's not found, return null or a default value.
      return null;
    };

    getAuthToken(): any {
        return sessionStorage.getItem('token');
    }
}
