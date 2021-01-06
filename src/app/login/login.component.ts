import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../core/model/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/reducers/auth.reducers';
import { LogIn } from '../store/actions/auth.action';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
      this.store.dispatch(new LogIn(payload)); 
      this.getState.subscribe((state) => {
        this.errorMessage = state.errorMessage;
        this.loginForm.markAsPristine();
      });     
    }
    }
}


