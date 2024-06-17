import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { Employee } from '@services/models/employee.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
        
@Component({
    selector: 'employee-form-old',
    templateUrl: './employee-form-old.component.html',
    standalone: true,
    imports: [CommonModule, DialogModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, CalendarModule]
})
export class EmployeeFormOld implements OnInit {
    @Input() visible!: boolean | false
    @Input() dataEmployee!: Employee

    @Output() closeDialog = new EventEmitter()

    employee: Employee = {
        "_id": '',
        "username": '',
        "firstName": '',
        "lastName": '',
        "email": '',
        "birthDate": '',
        "basicSalary": 0,
        "status": '',
        "group": '',
        "description": '',
        "picture": {
            "large": '',
            "medium": '',
            "thumbnail": ''
        }
    };

    maxDate = new Date();
    userForm: any;
    constructor(private fb: FormBuilder) {
        // this.maxDate.setDate(this.maxDate.getDate() + 1); // today + 1
    }

    ngOnInit(): void {}
    onShow() {
        this.employee = this.dataEmployee;
        this.employee.birthDate!= this.formatDate(this.dataEmployee.birthDate)

    }
    onHide() {
        this.closeDialog.emit(false);
        this.reset()
    }
    formatDate(value: Date) {
        return new Date(value).toLocaleDateString('en-GB')
    }

    saveData(){
        console.log(this.userForm.value);
    }

    reset() {
        this.employee = {
            "_id": '',
            "username": '',
            "firstName": '',
            "lastName": '',
            "email": '',
            "birthDate": new Date,
            "basicSalary": 0,
            "status": '',
            "group": '',
            "description": '',
            "picture": {
                "large": '',
                "medium": '',
                "thumbnail": ''
            }
        }
        // this.employee = {} as Employee
    }
}