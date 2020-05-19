import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  serverErrorMessages : String;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);  
      }
    );
  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }



  onDelete(_id : String) {
    window.alert('Your Account has been closed!');
     this.userService.deleteUser(_id).subscribe(
        res => {
          this.userService.deleteToken();
          this.router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
      }
    );
    }

    checkStatus() {
      return this.userDetails.fullName.split(' ')[1] ? this.userDetails.fullName.split(' ')[1]+(this.userDetails.fullName.split(' ')[2]?" "+this.userDetails.fullName.split(' ')[2]:" ") : "--";
    }

    onDebit(newbalance, _id: String, balance){
      var data = {"balance": balance, "transactions":{"time": Date.now(), "money": -newbalance}}; 
      if (newbalance > this.userDetails.balance) {
        window.alert('Error: Insufficient Funds');
        return;
      }
      if(newbalance < 0){
        window.alert('Error: Invalid transaction amount');
        return;
      }
      if(!newbalance.match("^[0-9]*$")){
        window.alert('Error: Invalid transaction amount');
        return;
      }

      this.userService.debit(data, _id).subscribe(
        res =>{
           window.location.reload();
        },
        err=>{
          window.alert(err);
        }
      );
    }

    gettime(){
      
    }

    onCredit(newbalance, _id: String,balance){
      var data = {"balance": balance, "transactions":{"time": Date.now(), "money": newbalance}};  
      if(newbalance < 100){
        window.alert('Minimum Credit Value is Rs.100/-');
        return;
      }
      if(!newbalance.match("^[0-9]*$")){
        window.alert('Error: Invalid transaction amount');
        return;
      }
      this.userService.credit(data, _id).subscribe(
        res =>{
          window.location.reload();
        },
        err=>{
          window.alert(err);
        }
      );
    }

}