import { Component, inject } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromFeature from '../store/reducers/auth.reducers';
import * as UserActions from '../store/actions/auth.action';
import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store<fromFeature.State>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports:[ FormsModule,
        RouterTestingModule,
        StoreModule.forRoot(fromFeature.reducers),
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store); 
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create an instance of ngoninit', () => {
    component.ngOnInit();
  });

  it('should bind input text value to Component property', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#comment');

    fixture.detectChanges();

    nameInput.value = 'Amit Shah';

    nameInput.dispatchEvent(new Event('input'));

    expect(component.userComment).toBe('Amit Shah');
  });

  it('should dispatch the logout action when signOut is invoked', () => {
      const action = new UserActions.LogOut()
      fixture.detectChanges();
      component.signOut();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

});
