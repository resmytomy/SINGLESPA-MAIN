import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = {
    username: null,
    password: null
  };
  errorMessage: string;

  @ViewChild('loginForm', {static: false}) loginForm: NgForm;

  constructor(private authService: AuthService,
              private router: Router) { }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.form).subscribe(() => {
       // this.router.navigateByUrl('/');
       console.log("logged in ",sessionStorage.getItem("userName"));
       console.log("logged in type",sessionStorage.getItem("type"))

       window.alert('Logged in succefully')
      }, err => {
        console.log("error ")

        this.errorMessage = err && err.error;
      });
    } else {
      console.log("err in ")

      this.errorMessage = 'Please enter valid data';
    }
  }

  resetError(): void {
    this.errorMessage = null;
  }

  readSessionStorage(){
    if(sessionStorage.getItem("loggedin")=='true'){
      return true;
    }else{
      return false;

    }

  }
  getUser(){
    return (sessionStorage.getItem("userName"))
  }

}
