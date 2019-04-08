import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 

  }

  ngOnInit() {
    this.createForm();
  }

  tryGoogleLogin() {
    this.authService.tryGoogleLogin();
  }

  tryLogin(credentials) {
    this.authService.tryLogin(credentials)
    .then(res => {
      //this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  sendPasswordResetEmail(credentials) {
    this.authService.sendPasswordResetEmail(credentials.email)
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }


  
}
