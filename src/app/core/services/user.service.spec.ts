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
        UserService
      }]
    });
  });

  beforeEach(() => { service = new UserService(); });
  it('#authenticate should return value from observable',
  (done) => {
  service.authenticate('abc@gmail.com','1234567').subscribe(value => {
   expect(value).toBe(MOCK_USER);
   expect(service._authenticated).toEqual(true)
    done();
  });
});


it('#isAuthenticated  false should return value from observable',
(done) => {
  service._authenticated=true
service.isAuthenticated().subscribe(value => {
 expect(value).toBe(true); 
  done();
});
});
});
