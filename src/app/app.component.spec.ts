import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,

      ],
    }).compileComponents();
  }));

  it('should have router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
});
});
