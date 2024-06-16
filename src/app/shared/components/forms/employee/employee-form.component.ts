import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { Employee } from '@services/models/employee.interface';
        
@Component({
    selector: 'employee-form',
    templateUrl: './employee-form.component.html',
    standalone: true,
    imports: [DialogModule, ButtonModule, InputTextModule, AvatarModule]
})
export class EmployeeForm implements OnInit {
    @Input() visible!: boolean | false
    @Input() dataEmployee!: Employee

    @Output() closeDialog = new EventEmitter()
    employee!: Employee

    constructor() {
        
    }

    ngOnInit(): void {}
    onShow() {
        this.employee = this.dataEmployee;
        console.log("INIT DIALOG", this.employee);
    }
    onHide() {
        this.closeDialog.emit(false);
        this.reset()
        console.log("CLOSE DIALOG", this.employee);
    }
    reset() {
        // this.employee = {
        //     "_id": '',
        //     "username": '',
        //     "firstName": '',
        //     "lastName": '',
        //     "email": '',
        //     "birthDate": new Date,
        //     "basicSalary": 0,
        //     "status": '',
        //     "group": '',
        //     "description": '',
        //     "picture": {
        //         "large": '',
        //         "medium": '',
        //         "thumbnail": ''
        //     }
        // }
        this.employee = {} as Employee
    }
}