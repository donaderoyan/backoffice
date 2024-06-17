import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'detail-employee',
    templateUrl: './employee-detail.component.html', 
    standalone: true,
    imports: [ButtonModule]
})
export class RegisterComponent implements OnInit {
    constructor() {}
    public ngOnInit() : void {}
}