import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path          : 'home',
        loadComponent : () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path         : 'auth',
        loadChildren : () => import('./pages/auth/auth.routes').then(m => m.routes),
    },
];
