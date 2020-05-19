import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    balance: 0
  };

  noAuthHeader = { headers: new HttpHeaders({'NoAuth': 'true'})};

  constructor(private http: HttpClient) { }

  // HttpMethods
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register', user, this.noAuthHeader);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseUrl+'/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  deleteUser(_id: String){
    return this.http.delete(environment.apiBaseUrl+`/${_id}`);
  }
  
  credit(transaction: any, _id: String){
    console.log(transaction,_id);
    return this.http.put(environment.apiBaseUrl+ `/${_id}`, transaction);
  }

  debit(transaction: any, _id: String){
    console.log(transaction,_id);
    return this.http.put(environment.apiBaseUrl+ `/${_id}`, transaction);
  }
  
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if(token){
      var UserPayload = atob(token.split('.')[1]);
      return JSON.parse(UserPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
