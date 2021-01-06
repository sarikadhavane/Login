import { async, getTestBed, TestBed } from '@angular/core/testing';

import { MOCK_USER, UserService } from './user.service';

import { User } from '../model/user';
import { exception } from 'console';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let injector: TestBed;
  let mockAuthService: any = {
    isAuthenticated: () => true,
    authenticate: () => {
      return MOCK_USER
    },
  };
  const userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['authenticate']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{
        provide: UserService,
        useValue: mockAuthService
      }]
    });
    injector = getTestBed();
    service = injector.get(UserService);
  });
 
});
