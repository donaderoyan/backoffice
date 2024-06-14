import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html', 
    standalone: true,
    imports: [ButtonModule]
})
export class RegisterComponent implements OnInit {
    constructor() {}
    public ngOnInit() : void {}
}