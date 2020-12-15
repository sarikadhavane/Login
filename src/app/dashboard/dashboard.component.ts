import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../model/user';
import { AddComment, LogOut } from '../store/auth.action';
import { AppState, selectAuthState } from '../store/auth.reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userComment;
  getState;
  constructor(private store: Store<AppState>,private router:Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.userComment = state.comment ? state.comment : '';
    });
  }
 
  signOut() {
    this.store.dispatch(new LogOut());
  }

  addComment(){
   this.store.dispatch(new AddComment(this.userComment)); 
  }
}
