import { CommonModule } from '@angular/common';
import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';


@Component({
    selector: 'login.component',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, RouterLink, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule,]
})
export class LoginComponent implements OnInit {
    public credential = { // Hardcode user
        email: "user@mail.com",
        password: "password"
    };
    public formGroup !: FormGroup<{
        email    : FormControl<string>,
        password : FormControl<string>,
    }>;
    isloading!: boolean | false
    constructor(private router: Router) {
        this.initFormGroup();
    }
    public ngOnInit() : void {}

    private initFormGroup() : void {
        this.formGroup = new FormGroup({
        email           : new FormControl<string>({
            value       : '',
            disabled    : false
        }, { validators : [Validators.required, Validators.email], nonNullable : true }),
        password        : new FormControl<string>({
            value       : '',
            disabled    : false
        }, { validators : [Validators.required], nonNullable : true })
        });
    }

    public async onClickSubmit() : Promise<void> {
        if (this.formGroup.controls.email.value !== this.credential.email || this.formGroup.controls.password.value !== this.credential.password) {
            console.log("Login failed");
        } else {
            localStorage.setItem('token', 'secret');
            this.router.navigate(['/home']);
        }
    }
}