import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../model/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/auth.reducers';
import { LogIn } from '../store/auth.action';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  getState: Observable<any>;
  errorMessage: string | null;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,private router:Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.loginForm = this.formBuilder.group({
      useremail: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      password: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.valid){
      const payload = {
        email: this.f.useremail.value,
        password: this.f.password.value
      };
      console.log(this.errorMessage,'mee')
      
      this.store.dispatch(new LogIn(payload)); 
      this.getState.subscribe((state) => {
        this.errorMessage = state.errorMessage;
        this.loginForm.markAsPristine();
        console.log(this.errorMessage)
        console.log(state)
        if(state.isAuthenticated){
       //   this.router.navigateByUrl('/dashboard');
        }
      });     
    }
    }
}


