import { CommonModule, Location } from '@angular/common';
import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { Employee } from '@services/models/employee.interface';
import { PageLayoutComponent } from '@layouts/page-layout/page-layout.component';
//store
import * as EmployeeSelectors from "@states/employee/employee.selector"


@Component({
    selector: 'detail-employee',
    templateUrl: './employee-detail.component.html', 
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, CardModule, ChipsModule, ButtonModule]
})
export class DetailEmployee implements OnInit {
    employee!: Employee
    constructor(private store: Store, private route: ActivatedRoute, private location: Location) {
        const id = this.route.snapshot.queryParamMap.get('id') || '';
        this.store.select(EmployeeSelectors.selectEmployeeById(id)).subscribe((employee: Employee | undefined) => {
            if (employee) {
                this.employee = employee;
            } else {
                console.error('Employee not found');
            }
        });
    }
    public ngOnInit() : void {}

    back(){
        this.location.back();
    }
    formatDate(value: Date) {
        return new Date(value).toLocaleDateString('en-GB')
    }
    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'IDR' });
    }
}