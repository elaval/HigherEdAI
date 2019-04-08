import { Component, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var jQuery: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements AfterViewInit {
    userName: any;

    constructor(
        private router: Router,
        private authService : AuthService
    ) 
    {

    this.authService.user.subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.email;
      } 
      
    })  
    
    }

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean {
        return this.router.url.indexOf(routename) > -1;
    }


}
