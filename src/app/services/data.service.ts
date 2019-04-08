import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: any;
  directorio: { sede: string; carreras: (Function | (() => string) | (() => string) | (() => Object) | ((v: string | number | symbol) => boolean) | ((v: Object) => boolean) | ((v: string | number | symbol) => boolean))[]; }[];
  selectedSede: { sede: string; carreras: (Function | (() => string) | (() => string) | (() => Object) | ((v: string | number | symbol) => boolean) | ((v: Object) => boolean) | ((v: string | number | symbol) => boolean))[]; };
  selectedCarrera: Function | (() => string) | (() => string) | (() => Object) | ((v: string | number | symbol) => boolean) | ((v: Object) => boolean) | ((v: string | number | symbol) => boolean);
  dataCarrera: Object;
  data_matricula: any;

  dataSubjet = new BehaviorSubject(null);
  data = this.dataSubjet.asObservable();

  selectedCarreraSubjet = new BehaviorSubject(null);
  selectedCarreraObservable = this.selectedCarreraSubjet.asObservable();

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private http: HttpClient

  ) { 
    this.authService.user.subscribe(user => {
      this.user = user;

      const ref = this.storage.ref('carreras/carreras.json');
      ref.getDownloadURL().subscribe(url => {
        
        this.http.get(url).subscribe(data => {
          this.directorio = _.chain(data)
            .groupBy(d => d["nomb_sede"])
            .map((items,key) => ({sede:key, carreras:items}))
            .value();

          this.selectedSede = this.directorio[0];
          this.selectedCarrera = this.selectedSede.carreras[0];
          this.onSelectCarrera(this.selectedCarrera);

        })
      });

    })
  }

  getDataMatricula() {
    return new Promise((resolve, reject) => {
      if (this.data_matricula) {
        resolve(this.data_matricula)
      } else {
        const ref = this.storage.ref('autonoma/matriculaAnual/data.json');
        ref.getDownloadURL().subscribe(url => {
          this.http.get(url).toPromise()
          .then(data => {
            this.data_matricula = data;
            resolve(data)
          })
          .catch(err => {
            reject(err);
          });
        },
        err => reject(err));
      }
    })
  }

  dataMatricula(codigo_unico) {
    return new Promise((resolve, reject) => {
      this.getDataMatricula()
      .then(data => {
        resolve(data && data[codigo_unico])
      })
      .catch(err => reject(err));
    })
  }

  onSelectCarrera(carrera) {
    const codigoUnico = carrera.codigo_unico;
    
    this.selectedCarreraSubjet.next(carrera);
    
    const ref = this.storage.ref(`carreras/${codigoUnico}.json`);
    ref.getDownloadURL().subscribe(url => {
      
      this.http.get(url).subscribe(data => {
        this.dataSubjet.next(data);
      })
    });
  }
}
