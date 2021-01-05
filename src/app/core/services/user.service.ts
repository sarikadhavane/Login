import { Injectable } from '@angular/core';
import { Mock } from 'protractor/built/driverProviders';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../model/user';

export const MOCK_USER = new User();
MOCK_USER.email = "abc@gmail.com";
MOCK_USER.password = "1234567";
MOCK_USER.comment ='';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _authenticated = false;
  constructor() { }


  public authenticate(email: string, password: string): Observable<User> {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      this._authenticated = true;
      return of(MOCK_USER);
    }
    this._authenticated = false;
    return throwError(new Error("Invalid email or password"));
  }
  
  public isAuthenticated(): Observable<boolean> {
    return of(this._authenticated);
  }

  public authenticatedUser(): Observable<User> {
    return of(MOCK_USER);
  }

  public addComment(user: User): Observable<User> {
    return of(user);
  }

  public signout(): Observable<boolean> {
    this._authenticated = false;
    return of(true);
  }
  
  public getStatus(): Observable<boolean> {
    return of(this._authenticated)
  }
  
}
