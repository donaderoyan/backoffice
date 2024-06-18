import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
    isAuthenticated!: boolean | false
    constructor(private router: Router) {
        if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                this.isAuthenticated = true;
            } else {
                this.isAuthenticated = false;
            }
        }
    }
    canActivate(): boolean {
        if (!this.isAuthenticated) {
            this.router.navigate(['/auth']);
            return false;
        }
        return true
  }
}