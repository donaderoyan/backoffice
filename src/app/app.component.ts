import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as EmployeeActions from "@states/employee/employee.action"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {
    this.store.dispatch(EmployeeActions.loadEmployee()) // Only for this case, load data is moved here so it doesn't get API every time the router changes (see documentation https://randomuser.me/documentation)
  }
  public ngOnInit() : void {}
}

