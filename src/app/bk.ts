import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any;
  lastActivity: any;
  constructor(
    db: AngularFirestore,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    /*
    db.collection('jobsDone').valueChanges().subscribe((data) => {
      data.forEach((d => {
        const components = d['outputKey'].match(/^(.*)\/output\/([^\/]+)\/(.*)$/)
        const domain = components[1];
        const folder = components[2];
        const key = components[3];
        d["folder"] = folder;
        d["key"] = key;
        
      }))
      const nestedItems = []

      const groupedItems = _.groupBy(data, (d) => d.folder);
      _.each(groupedItems, (items, folder) => {
        nestedItems.push({"folder": folder, "items":_.sortBy(items, d => d.key)})
      })
      
      this.items = nestedItems;
    });

    db.collection("logs").doc("LAST_ACTIVITY").get().subscribe((d) => {
      this.lastActivity = d.data();
    })
    

    this.afAuth.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      }
    })
    */
    
  }
  title = 'soundsetMonitor';

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      //new auth.EmailAuthProvider());
    //auth.GoogleAuthProvider()
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}



