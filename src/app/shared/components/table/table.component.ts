import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Employee } from "@services/models/employee.interface";
import { ButtonModule } from "primeng/button";
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

interface Column {
    field: string
    header: string
}

@Component({
    selector: 'table-component',
    templateUrl: './table.component.html',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, CardModule]
})
export class TableComponent implements OnInit {
    @Input() employees!: Employee[];

    cols!: Column[]

    first = 0;

    rows = 10;

    constructor() {}

    ngOnInit() {
        this.cols = this.employees.reduce<Column[]>((acc, employee) => {
            Object.keys(employee).forEach(key => {
                if (!acc.find(col => col.field === key)) {
                    if (key === 'picture') {
                        acc.unshift({ field: key, header: key.charAt(0).toUpperCase() + key.slice(1) });
                    } else {
                        acc.push({ field: key, header: key.charAt(0).toUpperCase() + key.slice(1) });
                    }
                }
            });
            return acc
        }, [])
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }
    pageChange(event: { first: number, rows: number }) {
        this.first = event.first
        this.rows = event.rows
    }
    isLastPage(): boolean {
        return this.employees ? this.first === this.employees.length - this.rows : true
    }

    isFirstPage(): boolean {
        return this.employees ? this.first === 0 : true
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'IDR' });
    } 
}