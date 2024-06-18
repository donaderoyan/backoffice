import { Component, inject }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { EmployeeApiService } from '@services/api/employee-api.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// Components
import { PageLayoutComponent }  from '@layouts/page-layout/page-layout.component';
import { TableComponent } from '@table/table.component';
import { EmployeeForm } from '@forms/employee/employee-form.component';

// store
import { Employee } from '@services/models/employee.interface';
import * as EmployeeSelectors from "@states/employee/employee.selector"



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgFor, PageLayoutComponent, ButtonModule, TableComponent, EmployeeForm]
})
export class HomeComponent implements OnInit {
    http = inject(HttpClient)
    employeeApi = inject(EmployeeApiService)
    employees$!: Observable<Employee[]>
    isLoading$!: Observable<boolean | true>
    error!: Observable<string | null>
    employeesValue!: Employee[]
    loading!: boolean | true
    employeeDialogVisibility!: boolean | false

    // edit
    selectedData!: Employee

    constructor(private store: Store<{ data: {employees: Employee[]} }>) {
        // collect data
        this.employees$ = this.store.select(EmployeeSelectors.selectAllEmployee);
        this.employees$.subscribe((employees: Employee[]) => {
            this.employeesValue = [...employees];
        });
        this.isLoading$ = this.store.select(EmployeeSelectors.selectEmployeeLoading)
        this.isLoading$.subscribe((isLoading: boolean) => { this.loading = isLoading })
        this.error = this.store.select(EmployeeSelectors.selectEmployeeError)
    }
    public ngOnInit() : void {}

    // handle dialog
    openDialogEditEmployee(employee: Employee) {
        this.selectedData = employee
        this.employeeDialogVisibility = true
    }
    closeDialogEmployee(val: any) {
        this.employeeDialogVisibility = false
    }
    openDialogDeleteEmployee(_id: String) {
        console.log("Delete data", _id)
    }
}