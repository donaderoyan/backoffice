import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [ButtonModule]
})
export class LoginComponent implements OnInit {
    constructor() {}
    public ngOnInit() : void {}
}