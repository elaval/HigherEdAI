import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';
import * as moment from 'moment'
import { S3ServiceService } from '../../services/s3-service.service';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { AnalizerService } from 'src/app/services/analizer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any[];
  lastActivity: any;
  lastActivityTime: any;
  selectedFolder: any;
  classes = ["normal", "descarga"];
  user: any;
  validUser: any;
  jobsPendingCollection: any;
  jobsPending: any;
  profileUrl: Observable<any>;
  data: Object;
  directorio: Object;
  selectedSede: any;
  selectedCarrera: any;
  dataCarrera: Object;

  constructor(
    private db: AngularFirestore,
    private s3Service: S3ServiceService,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private http: HttpClient,
    private dataService: DataService,
    private analizerService : AnalizerService
  ) { 

    this.dataService.data.subscribe(data => {
      this.data = this.analizerService.topSchools(data);
    })
 
      
  }
  ngOnInit() {
  }

}
