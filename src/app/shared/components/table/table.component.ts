import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Employee } from "@services/models/employee.interface";
import { ButtonModule } from "primeng/button";
import { TableModule, Table } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from "primeng/inputtext";
import { TagModule } from 'primeng/tag';
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipModule } from "primeng/tooltip";

interface Column {
    field: string
    header: string
}
interface Option { 
    label: string, 
    value: string 
}


@Component({
    selector: 'table-component',
    templateUrl: './table.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, CardModule, InputTextModule, TagModule, 
        DropdownModule, MultiSelectModule, ProgressBarModule, SkeletonModule, TooltipModule ]
})
export class TableComponent implements OnInit {
    @Input() employees!: Employee[]
    @Input() isLoading!: boolean | true

    @Output() handleEdit = new EventEmitter();
    @Output() handleDelete = new EventEmitter();

    @ViewChild('dt') dt: Table | undefined;
    
    statuses!: Option[] | undefined;
    selectedStatuses: any | undefined;
    grup!: Option[] | undefined;
    selectedGrup: any | undefined;

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;

    cols!: Column[]

    first = 0

    rows = 10

    constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router) {}
    ngOnInit(): void {
        // cache searchValue
        if (typeof window !== 'undefined') {
            this.searchValue = window.sessionStorage.getItem('searchData') || '';
        }
        this.initializeTable()
    }
    // Initialize
    initializeTable(): void {
        this.cols = this.employees.reduce<Column[]>((acc, employee) => {
            Object.keys(employee).forEach(key => {
                if (!acc.find(col => col.field === key)) {
                    if(key != 'picture' && key != '_id') {
                        acc.push({ field: key, header: key.charAt(0).toUpperCase() + key.slice(1) });
                    }
                }
            });
            return acc
        }, [])

        this.statuses = [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }
        ];

        this.grup = [...new Set(this.employees.map(employee => employee.group))].map(group => {
            if (group) {
                return { label: group, value: group };
            }
            return {label: "No Group", value: "-"}
        }).filter(Boolean);

        this.changeDetectorRefs.detectChanges();
    }
    

    // Pagination
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

    formatDate(value: Date) {
        return new Date(value).toLocaleDateString('en-GB')
    }

    // filter
    clear(table: Table) {
        table.clear();
        this.selectedStatuses = ''
        this.searchValue = ''
        this.selectedGrup = ''
        window.sessionStorage.removeItem('searchData');
        window.sessionStorage.removeItem('table-session');
        
    }
    searchingTable(table: Table, val: any) {
        
            table.filterGlobal(val, 'contains')
            // const sessionData = sessionStorage.getItem('table-session');
            // const sessionObj = sessionData ? JSON.parse(sessionData) : {};
            // sessionStorage.setItem('table-session', JSON.stringify({ ...sessionObj, searchData: val }));
            window.sessionStorage.setItem('searchData', val);
        
    }
    getSeverity(status: string) {
        switch (status.toLowerCase()) {
            case 'inactive':
                return 'danger'
            case 'active':
                return 'success'
            default:
                return undefined
        }
    }


    // Handle Action
    editEmployee(employee: Employee) {
        this.handleEdit.emit(employee);
    }

    deleteEmployee(employee: Employee) {
        this.handleDelete.emit(employee._id);
    }

    // Handle Detail Employee
    goDetailEmployee(id: string) {
        this.router.navigate(
            ['/employee'],
            { queryParams: { id: id } }
          );
    }
    
}