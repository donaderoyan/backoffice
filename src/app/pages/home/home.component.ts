import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { ButtonModule } from 'primeng/button';

// Components
import { PageLayoutComponent }  from '@layouts/page-layout/page-layout.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [PageLayoutComponent, ButtonModule]
})
export class HomeComponent implements OnInit {
    constructor() {}
    public ngOnInit() : void {}
}