import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from '../model/user';

import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: UserService
  let guard: AuthGuard;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers: [AuthGuard,{ provide: Router, useValue: routerMock }
      ]
    });
    injector = getTestBed();
    authService = injector.get(UserService);
    guard = injector.get(AuthGuard);
  });

  it('should create auth gurd...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return false when not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));
    guard.canActivate(routeMock, routeStateMock).subscribe(canActivate => {
      expect(canActivate).toBeFalsy();
      expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  })
  });
  it('should allow the authenticated user to access app', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));
    expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy()
  });

});
