 import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { Actions, Effect, ofType } from '@ngrx/effects';
 import { map, switchMap, tap,catchError } from 'rxjs/operators';

 import { UserService } from '../../services/user.service';
 import {
     AuthActionTypes,
     LogIn, LogInSuccess, LogInFailure,
     LogOut,
     GetStatus,
 } from '../actions/auth.action';
 import { Observable, of } from 'rxjs';

 @Injectable()
 export class AuthEffects {

     constructor(
         private actions: Actions,
         private authService: UserService,
         private router: Router,
     ) { }

     // effects go here
  
     @Effect()
     LogIn: Observable<any> = this.actions.pipe(
         ofType(AuthActionTypes.LOGIN),
         map((action: LogIn) => action.payload),
         switchMap(payload => {
             return this.authService.authenticate(payload.email, payload.password).pipe(
                 map((user) => {
                     return new LogInSuccess({ password: payload.password, email: payload.email });
                 }),
                 catchError((error) => {
                     return of(new LogInFailure({ error: error }));
                 })
                 )          
              } ));
        
     @Effect({ dispatch: false })
     LogInSuccess: Observable<any> = this.actions.pipe(
         ofType(AuthActionTypes.LOGIN_SUCCESS),
          tap((user) => {
             this.router.navigateByUrl('/dashboard');
         }) 
     );

     @Effect({ dispatch: false })
     LogInFailure: Observable<any> = this.actions.pipe(
         ofType(AuthActionTypes.LOGIN_FAILURE)
     );

     @Effect({dispatch:false})
     AddComment: Observable<any> = this.actions.pipe(
         ofType(AuthActionTypes.ADD_COMMENT)
     );


     @Effect({ dispatch: false })
     GetStatus: Observable<any> = this.actions.pipe(
         ofType(AuthActionTypes.GET_STATUS),
         map((action: GetStatus) => action),
         switchMap(payload => {
             return this.authService.getStatus();
 }));
}