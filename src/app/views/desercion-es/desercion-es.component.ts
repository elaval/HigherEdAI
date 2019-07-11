import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, ChangeContext} from 'ng5-slider';
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash';
import {PredictionService} from '../../services/prediction.service';
import {DataPrediction} from '../../models/data-prediction';

@Component({
  selector: 'app-desercion-es',
  templateUrl: './desercion-es.component.html',
  styleUrls: ['./desercion-es.component.scss']
})
export class DesercionEsComponent implements OnInit {
  selectedPercentil = 50;
  dataPrediction: DataPrediction[];
  options: Options = {
      floor: 10,
      ceil: 90,
      step: 10
  };
  carrera: any;
  sede: any;
  constructor(private dataService: DataService, private predictionService: PredictionService) {}
  ngOnInit() {
    this.dataService.selectedCarreraObservable
      .subscribe(carrera => {
        if (carrera && carrera.codigo_unico) {
          this.carrera = carrera.nomb_carrera;
          this.sede = _.replace(carrera.nomb_sede, /SEDE /g, '');
          console.log(carrera);
          this.calcularPrediccion();
        }
      });
  }
  onUserChange(changeContext: ChangeContext): void {
    this.selectedPercentil = changeContext.value;
    this.calcularPrediccion();
  }
  calcularPrediccion() {
    const dataJson = {carrera_comuna_sede: [], carrera_nomb_carrera: [], escolar_percentil: [], escolar_nem: []};
    for (let i = 4; i <= 7; i += 0.1) {
        dataJson.carrera_comuna_sede.push(this.sede);
        dataJson.carrera_nomb_carrera.push(this.carrera);
        dataJson.escolar_percentil.push(this.selectedPercentil);
        dataJson.escolar_nem.push(i.toFixed(1));
    }
    this.predictionService.getPrediction('ussebastian_carrera_sede_nem_percentil', dataJson, 'escolar_nem').then((data) => {
      const jsonResults = [];
      _.forEach(data, (val, i) => {
          jsonResults.push({name: val.labels[0], value: val.results[1]});
      });
      this.dataPrediction = jsonResults;
    })
    .catch(err => {
      this.dataPrediction = [];
      console.error(err);
    });
  }
}
