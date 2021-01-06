/*   import { TestBed } from '@angular/core/testing';
 import { Actions } from '@ngrx/effects';
 import { Observable, of } from 'rxjs';
 import 'rxjs/add/observable/empty' 
 import { Router } from '@angular/router';
 import { hot, cold } from 'jest-marbles';
 import { AuthEffects } from './auth.effect';
 import { UserService } from '../../core/services/user.service';
 import { provideMockActions } from '@ngrx/effects/testing';
 import {
   LogIn,
   LogInFailure,
   LoginRedirect,
   LogInSuccess,
   LogOut
 } from '../actions/auth.action';
 import { User } from '../../core/model/user';
 import { Action } from '@ngrx/store';

 describe('AuthEffects', () => {
   let effects: AuthEffects;
   let authService: any;
   let routerService: any;
   let actions$ = new Observable<Action>();

   beforeEach(() => {
     TestBed.configureTestingModule({
       providers: [
         AuthEffects,
         provideMockActions(() => actions$),
         {
           provide: UserService,
           useValue: { authniticate: ()=>{} },
         },
         {
           provide: Router,
          useValue: { navigate: ()=>{}  },
         },
       ],
       
     });

     effects = TestBed.get(AuthEffects);
     authService = TestBed.get(UserService);
     actions$ = TestBed.get(Actions);
     routerService = TestBed.get(Router);

     spyOn(routerService, 'navigate').and.callThrough();
   });

   describe('LogIn', () => {
     it('should return an auth.LoginSuccess action, with user information if login succeeds', () => {
       const credentials:User  = { email: 'abc@gmail.com', password: '1234567' };
      const user = { name: 'User' } as User;
       const action = new LogIn(credentials);
       const completion = new LogInSuccess({ credentials });
      actions$ = hot("a", { a: action });
       actions$ = of(action);
       const response = cold('-a|', { a: credentials });
       const expected = cold('--b', { b: completion });
      authService.authenticate = jest.fn(() => response);

       expect(effects.LogIn).toBeObservable(expected);
     });

     it('should return a new auth.LoginFailure if the login service throws', () => {
       const credentials: User = { email: 'xyz@gmail.com', password: 'jjjj5678' };
       const action = new LogIn(credentials);
       const completion = new LogInFailure('Incorrect email and/or password.');
       const error = 'Incorrect email and/or password.';
      actions$ = of(action);
      actions$ = hot('-a---', { a: action });
       const response = cold('-#|', {}, error);
       const expected = cold('--b', { b: completion });
       spyOn(authService, 'authenticate');
       authService.authenticate = jest.fn(() => response); 

       expect(effects.LogIn).toBe(expected);
     });
   }); 

   describe('LogInSuccess', () => {
     it('should dispatch a RouterNavigation action', () => {
       const action = new LogInSuccess({ password: '1234567', email: 'abc@gmail.com' });

       actions$ = of(action);
       effects.LogInSuccess.subscribe(() => {
         expect(routerService.navigate).toHaveBeenCalledWith(['/dashboard']);
       });
     });
   });

  
 });

*/
 



