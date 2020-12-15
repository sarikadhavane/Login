import { getTestBed, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

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

  it('should get the active user correctly', () => {
    const user:User = {email:'abc@gmail.com',password:'1234567'}
    expect(service.authenticate('abc@gmail.com', '1234567'))
  //  spyOn(service, 'isAuthenticated').and.returnValue(of(true));
    
  });
});
