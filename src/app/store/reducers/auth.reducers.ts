
import { AddComment, All, AuthActionTypes } from "../actions/auth.action";

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from './auth.reducers';
import { User } from '../../core/model/user';
import { MOCK_USER } from '../../core/services/user.service';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
  comment:string | null;

}

export const initialState: State = {
  isAuthenticated: false,
  user: MOCK_USER,
  errorMessage: null,
  comment:null
};

//export const selectUserState = (state: State) => state.user; 

export interface AppState {
 readonly authState: State;
}

 export const reducers = {
  auth: auth.reducer
}; 

export const selectAuthState = createFeatureSelector<AppState>('auth');

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          password: action.payload.password,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated:false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }

    case AuthActionTypes.ADD_COMMENT:{
      return {
        ...state,
        comment:action.payload
      };
    }
   
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated:false
      };
    }
  
    default: {
      return state;
    }
  }
}


