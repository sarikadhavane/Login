import { reducer, initialState } from './auth.reducers';
import * as LoginActions from '../actions/auth.action';
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../../model/user'
import { MOCK_USER } from '../../services/user.service';

describe('UserLogin Reducer', () => {

  let user: User = new User();
  beforeEach(() => {
    user = MOCK_USER;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducer)],
      providers: [
        { provide: Store, useClass: Store }
      ]
    })
      .compileComponents();
  });

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LogIn action', () => {
    it('should set loading to true', () => {
      const userData = { email: 'abc@gmail.com', password: '1234567' };
      const action = new LoginActions.LogInSuccess(userData);
      const state = reducer(initialState, action);
      expect(state.isAuthenticated).toEqual(true);
      expect(state.errorMessage).toEqual(null);
    });
  });

  describe('LogInFailure action', () => {
    it('should return some error', () => {
      const userData = { email: 'abcyv@gmail.com', password: '1234567' };
      const action = new LoginActions.LogInFailure(userData);
      const state = reducer(initialState, action);
      expect(state.isAuthenticated).toEqual(false);
      expect(state.errorMessage).toEqual('Incorrect email and/or password.');
    });
  });

  describe('AddComment action', () => {
    it('should return user', () => {
      const action = new LoginActions.AddComment({ comment:'Add a comment!!' });
      const state = reducer(initialState, action);
      expect(state.comment).not.toBeNull();
    });
  });

  describe('Logout action', () => {
    it('should return user is Authentication false', () => {
      const action = new LoginActions.LogOut();
      const state = reducer(initialState, action);
      expect(state.isAuthenticated).toEqual(false);
    });
  });
});