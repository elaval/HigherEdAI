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
  enabledPercentil = true;
  dataPredictionNEM: DataPrediction[];
  dataPredictionSede: DataPrediction[];
  options: Options = {
      floor: 10,
      ceil: 90,
      step: 10,
      disabled: false
  };
  ies: any;
  sede: any;
  carrera: any;
  carrerasPorSede: any;

  constructor(private dataService: DataService, private predictionService: PredictionService) {}
  ngOnInit() {
    // TODO llamar selectedCarreraObservable al obtener respuesta desde getCarrerasPorSedes
    this.dataService.selectedCarreraObservable
      .subscribe(carrera => {
        if (carrera && carrera.codigo_unico) {
          this.carrera = carrera.nomb_carrera;
          this.sede = carrera.nomb_sede;
          this.ies = this.dataService.selectedIE;
          this.dataService.getCarrerasPorSedes(this.ies.cod_inst).then((data) => {
            this.carrerasPorSede = data;
            this.calcularPrediccionPorNEM();
            this.calcularPrediccionPorSede();
          });
        }
      });
  }
  onUserChange(changeContext: ChangeContext): void {
    this.selectedPercentil = changeContext.value;
    this.calcularPrediccionPorNEM();
    this.calcularPrediccionPorSede();
  }
  onChangeDisabled(): void {
    this.options = Object.assign({}, this.options, {disabled: !this.enabledPercentil});
    this.calcularPrediccionPorNEM();
    this.calcularPrediccionPorSede();
  }

  calcularPrediccionPorNEM() {
    if (!this.sede || _.isUndefined(this.carrerasPorSede)) { return; }
    let dataJson = {carrera_nomb_sede: [], carrera_nomb_carrera: [], escolar_nem: [] };
    let modelName = (this.ies.nombre.toLowerCase().indexOf('autónoma') >= 0) ? 'autonoma' : 'ussebastian';
    modelName += '_carrera_sede_nem';
    if (this.enabledPercentil) {
      dataJson = _.merge(dataJson, {escolar_percentil: [] });
      modelName += '_percentil';
    }
    for (let i = 4; i <= 7; i += 0.1) {
        dataJson.carrera_nomb_sede.push(this.sede);
        dataJson.carrera_nomb_carrera.push(this.carrera);
        dataJson.escolar_nem.push(i.toFixed(1));
        if (this.enabledPercentil) {
          _.get(dataJson, 'escolar_percentil').push(this.selectedPercentil);
        }
    }
    this.predictionService.getPrediction(modelName, dataJson, 'escolar_nem').then((data) => {
      const jsonResults = [];
      _.forEach(data, (val, i) => {
          jsonResults.push({name: val.labels[0], value: val.results[1]});
      });
      this.dataPredictionNEM = jsonResults;
    })
    .catch(err => {
      this.dataPredictionNEM = [];
      console.error(err);
    });
  }

  calcularPrediccionPorSede() {
    if (!this.sede || _.isUndefined(this.carrerasPorSede)) { return; }
    let dataJson = {carrera_nomb_sede: [], carrera_nomb_carrera: []};
    let modelName = (this.ies.nombre.toLowerCase().indexOf('autónoma') >= 0) ? 'autonoma' : 'ussebastian';
    modelName += '_carrera_sede';
    if (this.enabledPercentil) {
      dataJson = _.merge(dataJson, {escolar_percentil: [] });
      modelName += '_percentil';
    }
    const filterSede = _.chain(this.carrerasPorSede).filter({ carrera: this.carrera }).value();
    _.forEach(_.uniqBy(_.map(filterSede[0].sedes, 'nomb_sede')), (data) => {
        dataJson.carrera_nomb_sede.push(data);
        dataJson.carrera_nomb_carrera.push(this.carrera);
        if (this.enabledPercentil) {
          _.get(dataJson, 'escolar_percentil').push(this.selectedPercentil);
        }
    });
    this.predictionService.getPrediction(modelName, dataJson, 'carrera_nomb_sede').then((data) => {
      const jsonResults = [];
      _.forEach(data, (val, i) => {
          jsonResults.push({name: val.labels[0], value: val.results[1]});
      });
      this.dataPredictionSede = jsonResults;
    })
    .catch(err => {
      this.dataPredictionSede = [];
      console.error(err);
    });
  }

}
