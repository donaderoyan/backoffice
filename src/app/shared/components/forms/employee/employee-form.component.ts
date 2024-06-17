import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { Employee } from '@services/models/employee.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
        
@Component({
    selector: 'employee-form',
    templateUrl: './employee-form.component.html',
    standalone: true,
    imports: [CommonModule, DialogModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, CalendarModule]
})
export class EmployeeForm implements OnInit {
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
    public formGroup !: FormGroup<{
        firstName: FormControl<string>,
        lastName: FormControl<string>,
        email    : FormControl<string>,
        birthDate : FormControl<any>,
        basicSalary    : FormControl<number>,
        status    : FormControl<string>,
        group: FormControl<string>,
        description: FormControl<string>
    }>;

    constructor(private fb: FormBuilder) {
        // this.maxDate.setDate(this.maxDate.getDate() + 1); // today + 1
        this.initFormGroup()
    }

    private initFormGroup() : void {
        this.formGroup = new FormGroup({
          firstName  : new FormControl<string>({
            value    : this.employee.firstName || '',
            disabled : false
          }, { validators : [Validators.required, Validators.minLength(3)], nonNullable : true }),
          lastName  : new FormControl<string>({
              value    :  this.employee.lastName || '',
              disabled : false
          }, { validators : [Validators.required, Validators.minLength(3)], nonNullable : true }),
          email      : new FormControl<string>({
            value    : this.employee.email || '',
            disabled : false
          }, { validators : [Validators.required, Validators.email], nonNullable : true }),
          birthDate      : new FormControl<any>({
            value    : this.employee.birthDate || '',
            disabled : false
          }, { validators : [Validators.required], nonNullable : true }),
          basicSalary      : new FormControl<number>({
            value    : this.employee.basicSalary || 0,
            disabled : false
          }, { validators : [Validators.required, Validators.pattern(/^\d+$/)], nonNullable : true }),
          status      : new FormControl<string>({
            value    : this.employee.status || '',
            disabled : false
          }, { validators : [Validators.required], nonNullable : true }),
          group      : new FormControl<string>({
            value    : this.employee.group || '',
            disabled : false
          }, { validators : [Validators.required, Validators.minLength(3)], nonNullable : true }),
          description      : new FormControl<string>({
            value    : this.employee.description || '',
            disabled : false
          }, { validators : [], nonNullable : true }),
            
        });
      }

    ngOnInit(): void {}
    onShow() {
        this.employee = this.dataEmployee;
        // this.employee.birthDate!= this.formatDate(this.dataEmployee.birthDate)
        this.initFormGroup()
    }
    onHide() {
        this.closeDialog.emit(false);
        this.reset()
    }
    formatDate(value: Date) {
        return new Date(value).toLocaleDateString('en-GB')
    }

    saveData(){
        console.log(this.formGroup);
    }

    reset() {
        this.formGroup.reset()
        // this.employee = {} as Employee
    }






    





}