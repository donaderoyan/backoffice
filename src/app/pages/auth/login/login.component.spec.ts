import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let messageService: MessageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToastModule, LoginComponent],
            providers: [MessageService]
        })
        .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.debugElement.componentInstance;
        router = TestBed.inject(Router);
        messageService = TestBed.inject(MessageService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to home on successful login', () => {
        component.formGroup.controls.email.setValue('user@mail.com');
        component.formGroup.controls.password.setValue('password');
        component.onClickSubmit().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/home']);
        });
    });

    it('should display error message on failed login', () => {
        component.formGroup.controls.email.setValue('wrongEmail@example.com');
        component.formGroup.controls.password.setValue('wrongPassword');
        component.onClickSubmit().then(() => {
            expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: 'Login failed please check again your email or password' });
        });
    });
});

