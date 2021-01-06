import { Action } from '@ngrx/store';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus',
  ADD_COMMENT ='[Auth] AddComment'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
    readonly type = AuthActionTypes.GET_STATUS;
    constructor(public payload: any) { }
  }

export class AddComment implements Action {
    readonly type = AuthActionTypes.ADD_COMMENT;
    constructor(public payload: any) { }
  }

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  | GetStatus
  | AddComment