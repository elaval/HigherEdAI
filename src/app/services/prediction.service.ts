import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  urlModel = 'assets/models/';
  // dataTraining: any;
  // model: any;
  // modelName: any;
  allModelAvailables: {name: string; training: object; model: any; }[] = [];
  constructor(private http: HttpClient) { }
  PredictionModel(dataPredict, keyData = '', modelName = '', model) {
      const dataResults = new Array();
      const tensor = new Array();
      const features = _.get(this.allModelAvailables,_.findKey(this.allModelAvailables, {name: modelName})).training.features;
      // const model = _.get(this.allModelAvailables,_.findKey(this.allModelAvailables, {name: modelName})).model;
      let valueNotExist =  new Array();
      // validar que los datos a predecir del tipo oneHot tengan valores validos en la data entrenada.
      _.forEach(features, (data, i) => {
          if (data.type === 'one_hot') {
              const dataDiff = _.map(dataPredict[i], (val, vi) => {
                  return _.indexOf(data.values, val) === -1 ? vi : null;
              });
              valueNotExist = _.union(valueNotExist, _.without(dataDiff, null));
          }
      });
      _.forEach(dataPredict, (data, i) => {
          _.remove(data, (val, key) => {
              return _.indexOf(valueNotExist, key) !== -1;
          });
      });
      if (_.isEmpty(_.get(dataPredict, _.findLastKey(dataPredict)))) {
          return dataResults;
      }
      _.forEach(features, (data, i) => {
          const values = new Array();
          if (data.type === 'one_hot') {
              // Replace categorical values by '-1' when is Null or NaN
              dataPredict[i] = _.map(dataPredict[i], (val, vi) => {
                  return val === null ? -1 : val;
              });
              const collectionTraining =  _.map(features[i].values, (value) => {
                    return value.toUpperCase();
              });
              _.forEach(dataPredict[i], (k, row) => {
                  const valueRow = dataPredict[i][row].toString().toUpperCase();
                  values.push(collectionTraining.indexOf(valueRow));
              });
              tensor.push(tf.oneHot(tf.tensor1d(values, 'int32'), collectionTraining.length));
          } else if (data.type === 'normalize') {
              _.forEach(dataPredict[i], (k, row) => {
                  values.push(((parseFloat(dataPredict[i][row]) - data.opts.mean) / data.opts.std));
              });
              tensor.push(tf.tensor1d(values, 'float32').expandDims(-1));
          } else if (data.type === 'numeric') {
              _.forEach(dataPredict[i], (k, row) => {
                  values.push(((parseFloat(dataPredict[i][row]) - data.opts.min) / (data.opts.max - data.opts.min)));
              });
              tensor.push(tf.tensor1d(values, 'float32').expandDims(-1));
          }
      });

      const tensorsEval = (tensor.length > 1) ? tf.concat(tensor, 1) : tensor[0];
      // read model and predict
      const results = model.predict(tensorsEval);
      const resultsSplit = _.chunk(Array.from(results.dataSync()), results.shape[1]);
      _.forEach(resultsSplit, (val, key) => {
          const data = {labels: [], results: val};
          _.forEach(_.split(keyData, ','), (v, k) => {
              data.labels.push(dataPredict[v][key]);
          });
          dataResults.push(data);
      });
      return dataResults;
  }
  getPrediction(modelN, dataPredict, keyData) {
    return new Promise((resolve, reject) => {
          this.loadDataTraining(modelN).then(() => {
          if (this.validatePredictData(dataPredict, modelN)) {
                this.loadModel(modelN).then((model) => {
                resolve(this.PredictionModel(dataPredict, keyData, modelN, model));
              });
          }
        }).catch(err => {reject(err); });
    });
  }
  loadModel(modelName) {
    return new Promise((resolve, reject) => {
      /*if (this.allModelAvailables && _.get(this.allModelAvailables,_.findKey(this.allModelAvailables, {name: modelName})).model) {
        resolve(this.allModelAvailables);
      } else {
        tf.loadLayersModel(this.urlModel.concat(modelName, '/model.json')).then(model => {
          _.set(_.get(this.allModelAvailables,_.findKey(this.allModelAvailables, {name: modelName})), 'model', model);
          resolve(this.allModelAvailables);
        });
      }*/
      tf.loadLayersModel(this.urlModel.concat(modelName, '/model.json')).then(model => {
          _.set(_.get(this.allModelAvailables,_.findKey(this.allModelAvailables, {name: modelName})), 'model', model);
          resolve(model);
      });
    });
  }

  loadDataTraining(modelName) {
    return new Promise((resolve, reject) => {
      if (this.allModelAvailables && _.findKey(this.allModelAvailables, { name: modelName })) {
        resolve(this.allModelAvailables);
      } else {
        this.http.get(this.urlModel.concat(modelName, '/', modelName, '.json'))
        .toPromise()
        .then(data => {
          this.allModelAvailables.push({name: modelName, training: data, model: []});
          resolve(this.allModelAvailables);
        })
        .catch(err => {
          reject(err);
        });
      }
    });
  }

  validatePredictData(dataPredict, modelName) {
    if (typeof dataPredict !== 'undefined' && this.isJSON(dataPredict)) {
        const features = _.get(this.allModelAvailables,_.findKey(this.allModelAvailables, {name: modelName})).training.features;
        const fromTraining = Object.keys(features);
        const fromPredict = Object.keys(dataPredict);
        // Comparison of arrays using name of keys
        if (this.compareKeys(fromTraining, fromPredict)) {
            let shapeQty = 0;
            _.forEach(features, (data, i) => {
                if (shapeQty !== dataPredict[i].length && shapeQty !== 0) { return false; }
                shapeQty = dataPredict[i].length;
            });
            if (shapeQty > 0) {return true; }
        }
    }
    return false;
}

    isJSON(item) {
        item = typeof item !== 'string' ? JSON.stringify(item) : item;
        try { item = JSON.parse(item); } catch (e) { return false; }
        if (typeof item === 'object' && item !== null) { return true; }
        return false;
    }

    compareKeys(array1, array2) {
        return array1.length === array2.length &&
            array1.sort().every((value, index) => {
                return value === array2.sort()[index];
            });
    }

}
