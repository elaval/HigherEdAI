import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
    selector: 'basic',
    templateUrl: 'basic.template.html'
})
export class basicComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        // Check if a user has been authenticated, otherwise go to login route
        this.authService.user.subscribe(user => {
            if (user) {
                //this.userName = user.displayName || user.email;
                this.router.navigate(['']);
            } else {
                this.router.navigate(['/login']);
            }
        
        })  
     
    }
}