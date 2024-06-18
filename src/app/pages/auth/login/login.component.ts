import { CommonModule } from '@angular/common';
import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'login.component',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [CommonModule, ToastModule, CardModule, ButtonModule, RouterLink, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule,],
    providers: [MessageService]
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
    constructor(private router: Router, private messageService: MessageService) {
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
        this.isloading = true
        if (this.formGroup.controls.email.value !== this.credential.email || this.formGroup.controls.password.value !== this.credential.password) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed please check again your email or password' });
            setTimeout(() => {
                this.isloading = false
            }, 2000);
        } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login succeed' });
            setTimeout(() => {
                localStorage.setItem('token', 'secret');
                this.isloading = false
                this.router.navigate(['/home']);
            }, 2000);
        }
    }
}