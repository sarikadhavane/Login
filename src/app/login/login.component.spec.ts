import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { exception } from 'console';
import { State, Store, StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppState, reducers } from '../store/auth.reducers';
import { UserService } from '../services/user.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let store: Store<AppState>;
  
let demoService: UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers, {})
    //    StoreModule.provideStore({ selectAuthState }),
        ],
        providers:[]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
   // store = fixture.debugElement.injector.get(Store);
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


});
