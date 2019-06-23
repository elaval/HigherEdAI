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

  carreras = {

  }
  ies: any;
  selectedIE: any;

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private http: HttpClient

  ) { 
    this.authService.user.subscribe(user => {
      this.user = user;

      /*
      const ref = this.storage.ref('carreras/carreras.json');
      ref.getDownloadURL().subscribe(url => {
        
        this.http.get(url).subscribe(data => {
          this.directorio = _.chain(data)
            .groupBy(d => d["nomb_sede"])
            .map((items,key) => ({sede:key, carreras:_.sortBy(items, d => d["nomb_carrera"])}))
            .value();

          _.each(this.directorio, (d) => {
              _.each(d.carreras, e => {
                e["nomb_carrera_version"] = `${e["nomb_carrera"]} (${e["codigo_unico"]})`
              })
            })


          this.selectedSede = this.directorio[0];
          this.selectedCarrera = this.selectedSede.carreras[0];
          this.onSelectCarrera(this.selectedCarrera);

        })
      });
      */

    })
  }

  getVersion(codigo) {
    const rVersion = codigo.match(/.*V(.*)/);

    if (! (rVersion && rVersion[1])) {
      console.log("NO V")
    }

    return rVersion && rVersion[1];
  }

  getIEs() {
    return new Promise((resolve, reject) => {
      if (this.ies) {
        this.processIEs(this.ies)
        resolve(this.ies);
      } else {
        this.http.get(`assets/data/ies/ies.json`)
        .toPromise()
        .then(data => {
          this.processIEs(data)
          resolve(data)
        })
        .catch(err => {
          reject(err);
        })
      }
    })
  }

  processIEs(data) {
    this.ies = data;
    this.selectedIE = this.ies[1];
    this.getCarreras(this.selectedIE["cod_inst"]);
  }

  onSelectedIE(ie) {
    this.selectedIE = ie;
    this.getCarreras(ie["cod_inst"]);
  }

  getCarreras(codIE) {
    return new Promise((resolve, reject) => {
      if (this.carreras[codIE]) {
        this.processCarreras(this.carreras[codIE])
        resolve(this.carreras[codIE]);
      } else {
        this.http.get(`assets/data/ies/${codIE}/carreras.json`)
        .toPromise()
        .then(data => {
          this.carreras[codIE] = data;
          this.processCarreras(data)
          resolve(data)
        })
        .catch(err => {
          reject(err);
        })
      }
    })
  }

  processCarreras(data) {
      this.directorio = _.chain(data)
        .groupBy(d => d["nomb_sede"])
        .map((items,key) => ({sede:key, carreras:_.sortBy(items, d => d["nomb_carrera"])}))
        .sortBy(d => d.sede)
        .value();

      _.each(this.directorio, (d) => {
          _.each(d.carreras, e => {
            e["nomb_carrera_version"] = `${e["nomb_carrera"]} (${e["codigo_unico"]})`
          })
        })


      this.selectedSede = this.directorio[0];
      this.selectedCarrera = this.selectedSede.carreras[0];
      this.onSelectCarrera(this.selectedCarrera);

  }

  

  getDataMatricula(ie) {
    return new Promise((resolve, reject) => {
      if (this.data_matricula) {
        resolve(this.data_matricula)
      } else {
        const ref = this.storage.ref('ies/39/matriculaAnual/data.json');
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
      this.getDataMatricula(this.selectedIE)
      .then(data => {
        resolve(data && data[codigo_unico])
      })
      .catch(err => reject(err));
    })
  }

  onSelectCarrera(carrera) {
    this.selectedCarrera = carrera;

    const codigoUnico = carrera.codigo_unico;
    
    this.selectedCarreraSubjet.next(carrera);
    
    const ref = this.storage.ref(`carreras/${codigoUnico}.json`);
    ref.getDownloadURL().subscribe(url => {
      
      this.http.get(url).subscribe(data => {
        this.dataSubjet.next(data);
      })
    },
    err => {
      console.error(err);
    });
  }
}
