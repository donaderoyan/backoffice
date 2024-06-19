import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { Employee } from '@services/models/employee.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as EmployeeActions from "@states/employee/employee.action"
import { Observable } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {v4 as uuidv4} from 'uuid';
import { InputNumberModule } from 'primeng/inputnumber';
        
@Component({
    selector: 'employee-form',
    templateUrl: './employee-form.component.html',
    standalone: true,
    imports: [CommonModule, DialogModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, CalendarModule, ToastModule, InputNumberModule],
    providers: [MessageService]
})
export class EmployeeForm implements OnInit {
    @Input() visible!: boolean | false
    @Input() dataEmployee!: Employee

    @Output() closeDialog = new EventEmitter()
    @Output() saveDialog = new EventEmitter()

    employees$!: Observable<Employee[]>

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

    constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService) {
        // this.maxDate.setDate(this.maxDate.getDate() + 1); // today + 1
        this.initFormGroup()
    }

    private initFormGroup() : void {
        this.formGroup = new FormGroup({
			firstName  : new FormControl<string>({
				value    : this.employee ? this.employee.firstName :  '',
				disabled : false
			}, { validators : [Validators.required, Validators.minLength(3)], nonNullable : true }),
			lastName  : new FormControl<string>({
				value    :  this.employee ? this.employee.lastName : '',
				disabled : false
			}, { validators : [Validators.required, Validators.minLength(3)], nonNullable : true }),
			email      : new FormControl<string>({
				value    : this.employee ? this.employee.email : '',
				disabled : false
			}, { validators : [Validators.required, Validators.email], nonNullable : true }),
			birthDate      : new FormControl<any>({
				value    : this.employee.birthDate, //this.employee ? new FormControl<this.employee.birthDate>  : '',
				disabled : false
			}, { validators : [Validators.required], nonNullable : true }),
			basicSalary      : new FormControl<number>({
				value    : this.employee ? this.employee.basicSalary : 0,
				disabled : false
			}, { validators : [Validators.required, Validators.pattern(/^\d+$/)], nonNullable : true }),
			status      : new FormControl<string>({
				value    : this.employee ? this.employee.status : '',
				disabled : false
			}, { validators : [Validators.required], nonNullable : true }),
			group      : new FormControl<string>({
				value    : this.employee ? this.employee.group : '',
				disabled : false
			}, { validators : [Validators.required, Validators.minLength(3)], nonNullable : true }),
			description      : new FormControl<string>({
				value    : this.employee ? this.employee.description : '',
				disabled : false
			}, { validators : [], nonNullable : true }),
            
        });
    }

    ngOnInit(): void {}
    onShow() {
        this.reset()
        this.employee = this.dataEmployee;
		this.employee = { ...this.employee, birthDate: new Date(this.employee.birthDate) }
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
		try {
			let check = this.employee && this.employee._id ? 'ada' : 'gada';
			let msg = this.employee && this.employee._id ? 'Add new Employee succeed' : 'Edit Employee succeed';
			switch(check) {
				case 'gada':
					this.addNew();
					break;
				case 'ada':
					this.edit();
					break;
				default:
					break;
			}
			this.saveDialog.emit(false);
			console.log("this.formGroup", this.formGroup)
        	this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
		} catch (error) {
			// catch err _id undefined in this.dataEmployee when add new employee
			console.error(error)
		}
    }

	edit() {
		this.employee = { ...this.employee, ...this.formGroup.value };
        if (this.formGroup.valid) {
          this.store.dispatch(EmployeeActions.editEmployee({ employee: this.employee }));
        }
	}

	addNew(){
		this.employee = { ...this.employee, ...this.formGroup.value };
		this.employee._id = uuidv4()
		console.log("Add new1", this.employee)
		this.employee.picture = {
			large: '',
			medium: '',
			thumbnail: ''
		}
		console.log("Add new2", this.employee)
		if (this.formGroup.valid) {
			this.store.dispatch(EmployeeActions.editEmployee({ employee: this.employee }));
		}
	}

    reset() {
        this.formGroup.reset()
        // this.employee = {} as Employee
    }






    





}