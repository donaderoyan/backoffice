import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path          : 'home',
        loadComponent : () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path          : 'employee',
        loadComponent : () => import('./pages/employee-detail/employee-detail.component').then(m => m.DetailEmployee),
    },
    {
        path         : 'auth',
        loadChildren : () => import('./pages/auth/auth.routes').then(m => m.routes),
    },
];
