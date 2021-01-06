import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { exception } from 'console';
import { State, Store, StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppState, reducers } from '../store/reducers/auth.reducers';
import { MOCK_USER, UserService } from '../core/services/user.service';
import { User } from '../core/model/user';
import * as fromFeature from '../store/reducers/auth.reducers';
import * as UserActions from '../store/actions/auth.action';
import { of } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let store: Store<fromFeature.State>
  let user: User = new User();
  const userServiceSpy = jasmine.createSpyObj('UserService', ['authenticate']);
  let userSpy;

  beforeEach(() => {
    user = MOCK_USER;
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        RouterTestingModule,
        StoreModule.forRoot(fromFeature.reducers),
    //    StoreModule.provideStore({ selectAuthState }),
        ],
        providers: [
          { provide: Store, useClass: Store },
          FormBuilder,
          {provide :UserService,useClass:userServiceSpy}
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA
        ]
        
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userSpy = userServiceSpy.authenticate.and.returnValue(of(MOCK_USER));
  
   // store = fixture.debugElement.injector.get(Store);
   store = TestBed.get(Store); 
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
        component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with email and password inputs', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#email')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('button')).toBeTruthy();
  });
 
  it('Should set submitted to true', async(() => {
    component.onSubmit();
    expect(component.onSubmit).toBeTruthy();
  }));

  it('Form should be valid', async(() => {
    component.loginForm.controls['useremail'].setValue('abc@gmail.com');
    component.loginForm.controls['password'].setValue('avcfthj');
    expect(component.loginForm.valid).toBeTruthy();
  })); 

  it('Form should be invalid', async(() => {
    component.loginForm.controls['useremail'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('Form and email should invalid', async(() => {
    const email = component.loginForm.controls.useremail;
    email.setValue('admim')
    const password = component.loginForm.controls.password;
    password.setValue(123456)
    expect(email.valid).toBeFalsy()
    expect(password.valid).toBeTruthy()
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('should validate email as required', () => {
    const email = component.loginForm.controls.useremail;
    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate password as required', () => {
    const password = component.loginForm.controls.password;
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });

  it('password check - should check password valid', () => {
    const password = component.loginForm.controls.password;
    password.setValue(123456)
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
  });
  it('should validate email format', () => {
    const email = component.loginForm.controls.useremail;
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    email.setValue('test');
    const errors = email.errors;
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });

  it('should validate email format correctly', () => {
    const email = component.loginForm.controls.useremail;
    email.setValue('test@test.com');
    const errors = email.errors || {};
  
    expect(email.valid).toBeTruthy();
    expect(email.errors).toBeNull();
  });
 
  it('should render email validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#email-error')).toBeFalsy();
  
    component.onSubmit();
  
    fixture.detectChanges();
    expect(elements.querySelector('#email-required')).toBeTruthy();
    expect(elements.querySelector('#email-required').textContent).toContain(
      'Email id is required'
    );
  });

  it('Login Success', () => {
    const action = new UserActions.LogIn({email:'abc@gmail.com',password:'1234567'});
    fixture.detectChanges();
    component.onSubmit();
     store.dispatch(action); 
     component.getState.subscribe(data => {
      expect(data.errorMessage).toEqual(null);
    });
  });

   it('loginService login() should called ', fakeAsync(() => {
    component.loginForm.controls['useremail'].setValue('abc@gmail.com');
    component.loginForm.controls['password'].setValue('1234567');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    const action = new UserActions.LogIn({email:'abc@gmail.com',password:'1234567'});
    fixture.detectChanges();
    store.dispatch(action); 
  })); 
});

