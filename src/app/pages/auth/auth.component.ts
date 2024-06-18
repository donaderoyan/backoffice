import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";


@Component({
    selector    : 'app-auth',
    templateUrl : './auth.component.html',
    standalone  : true,
    imports     : [CommonModule, RouterOutlet, RouterLink]
})
export class AuthComponent implements OnInit {
    constructor() {}
    public ngOnInit() : void {}
}