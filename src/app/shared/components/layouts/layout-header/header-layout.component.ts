import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Router }            from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';


@Component({
    selector    : 'app-header-layout',
    templateUrl : './header-layout.component.html',
    standalone  : true,
    imports     : [ButtonModule, MenuModule, BadgeModule, InputTextModule, FormsModule]
})
export class HeaderLayoutComponent implements OnInit {
    value: string | undefined;
    items: MenuItem[] | undefined;
    
    constructor( private router : Router ) { }
    ngOnInit() {
        this.items = [
            {
                label: 'Account',
                items: [
                    {
                        label: 'Settings',
                        icon: PrimeIcons.COG
                    },
                    {
                        label: 'Logout',
                        icon: PrimeIcons.SIGN_OUT,
                        command: () => this.logout()
                    }
                ]
            }
        ];
    }

    logout() {
        // NOTE Redirect to login
        this.router.navigate(['/auth/login']);
    }

}


