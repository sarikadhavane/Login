  
import * as UserLoginActions from './auth.action';


describe('LogIn', () => {
  it('should create an instance', () => {
    expect(UserLoginActions.LogIn).toBeTruthy();
  });
});

describe('LogInFailure', () => {
  it('should create an instance', () => {
    expect(UserLoginActions.LogInFailure).toBeTruthy();
  });
});

describe('LogInSuccess', () => {
  it('should create an instance', () => {
    expect(UserLoginActions.LogInSuccess).toBeTruthy();
  });
});



describe('LogOut', () => {
  it('should create an instance', () => {
    expect(UserLoginActions.LogOut).toBeTruthy();
  });
});

describe('AddComment', () => {
  it('should create an instance', () => {
    expect(UserLoginActions.AddComment).toBeTruthy();
  });
});

describe("LogIn", () => {
  it('shold create an action', () => {
    const action = new UserLoginActions.LogIn({ email: "abc@gmail.com", password: "1234567" });
    expect(action.type).toEqual("[Auth] Login");
  });
});


