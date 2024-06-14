import { Component, OnInit } from "@angular/core";

// Components
import { HeaderLayoutComponent } from '../layout-header/header-layout.component';

@Component({
    selector    : 'app-page-layout',
    templateUrl : './page-layout.component.html',
    standalone  : true,
    imports     : [HeaderLayoutComponent]
})
export class PageLayoutComponent implements OnInit {
    constructor() {}
    public ngOnInit() : void {}
}