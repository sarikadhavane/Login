import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { mergeMap, map, take, filter, skipWhile, first } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../../store/reducers/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  getState: Observable<any>
  constructor(
    public auth: UserService,
    public router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<boolean> {
    this.auth.isAuthenticated().subscribe(re => {
      if (!re) {
        this.router.navigate([''])
      }
      return re
    })
    return this.auth.isAuthenticated()
  }
}

