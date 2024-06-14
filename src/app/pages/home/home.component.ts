import { Component, inject }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { EmployeeApiService } from '@services/api/employee-api.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// Components
import { PageLayoutComponent }  from '@layouts/page-layout/page-layout.component';
import { TableComponent } from '@table/table.component';

// store
import { Employee } from '@services/models/employee.interface';
import * as EmployeeActions from "@states/employee/employee.action"
import * as EmployeeSelectors from "@states/employee/employee.selector"


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [AsyncPipe, NgFor, PageLayoutComponent, ButtonModule, TableComponent]
})
export class HomeComponent implements OnInit {
    http = inject(HttpClient)
    employeeApi = inject(EmployeeApiService)
    employees$!: Observable<Employee[]>
    data!: Employee[]
    error!: Observable<string | null>

    constructor(private store: Store<{ data: {employees: Employee[]} }>) {
        // collect data
        this.store.dispatch(EmployeeActions.loadEmployee())
        this.employees$ = this.store.select(EmployeeSelectors.selectAllEmployee)
        this.data = []
        this.store.select(EmployeeSelectors.selectAllEmployee).subscribe((employees: Employee[]) => this.data = employees)
        console.log("OOOO >> ", this.employees$)
        this.error = this.store.select(EmployeeSelectors.selectEmployeeError)
    }
    public ngOnInit() : void {}
}