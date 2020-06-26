import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Component(
  {
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  }
)
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        
    ) {  }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            type:['user',Validators.required]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.register(this.registerForm.value)
                   .subscribe(
                data => {
                  console.log(data)
                  window.alert('SUcessfully registred the user')

              //this.alertService.success('Registration successful', true);
                    this.router.navigateByUrl('/');
                },
                error => {
                 // window.alert(error)
                    this.loading = false;
                });
    }

    navigate(){
        this.router.navigateByUrl('/')
    
      }
    
      readPermission(){
        if(sessionStorage.getItem("loggedin")=='true' && sessionStorage.getItem("type")=='admin'){
          return true;
        }else{
          return false;
    
        }
    }
    
}