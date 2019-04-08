import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any;
  lastActivity: any;
  userName = null;
  title = 'soundsetMonitor';

  constructor(
    db: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {
/*
    this.authService.user.subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.email;
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/login']);
      }
      
    })  
    */  
  }

  logout() {
    this.authService.logout();
  }

}



