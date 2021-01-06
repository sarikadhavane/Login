import { getTestBed, TestBed } from '@angular/core/testing';

import { MOCK_USER, UserService } from './user.service';

import { User } from '../model/user';
import { exception } from 'console';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let injector: TestBed;
  const userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['authenticate']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{
        provide: UserService,
        useValue: userServiceSpy
      }]
    });
    injector = getTestBed();
    service = injector.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  
});
