//import * as tf from '@tensorflow/tfjs';
////////////////////////////////////////
/*
* Se encarga de obtener la predicción desde un modelo basado en tensorflowJS.
* Para poder utilizar la libreria, previamente se debe cargar tensorflowJS utilizando el siguiente script:
* <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
* La libreria responde a la estructura creada por TIDE S.A, por lo que es necesario contar con un archivo JSON con el
* detalle de los campos que son utilizados en el modelo.
* Para ser utilizado es necesario enviar a la funcion get_prediccion dos campos obligarios: nombre del modelo y data a predecir.
* Junto con lo anterior, se tiene la posibilidad de solicitar(en caso de estar disponible) un valor junto a la predicción que será
* utilizado como clave unica... como por ejemplo solicitar el PERS_NCORR + predicción. En caso de necesitar más de una clave, se puede utilizar
* como separador la coma (,). Ejemplo: "PERS_NCORR, CARR_CCOD".
* get_prediction(nombre_modelo,data_prediccion_json, "PERS_NCORR").then(console.log);
* */
///////////////////////////////////////

let data_training,model_name,model,results;
let url_model='http://localhost:4200/assets/models/';
function PredictionModel(data_predict, key_data=""){
    let data_results = new Array();
    let tensor = new Array();
    let value_not_exist =  new Array();

    //validar que los datos a predecir del tipo oneHot tengan valores validos en la data entrenada.
    _.forEach(data_training['features'], (data, i)=> {
        if(data['type']=='one_hot'){
            var data_diff=_.map(data_predict[i],(val, vi)=>{
                return _.indexOf(data['values'], val)== -1 ? vi : null;
            });
            value_not_exist = _.union(value_not_exist, _.without(data_diff, null));
        }
    });
    _.forEach(data_predict, (data, i)=> {
        _.remove(data, (val,key)=>{
            return _.indexOf(value_not_exist, key)!= -1;
        });
    });
    _.forEach(data_training['features'], (data,i)=>{
        var values = new Array();
        if(data['type']=='one_hot'){
            // Replace categorical values by '-1' when is Null or NaN
            data_predict[i] = _.map(data_predict[i],(val,vi)=>{
                return val === null ? -1 : val;
            });
            var collection_training =  _.map(data_training['features'][i]['values'],(value)=>{
                  return value.toUpperCase();
            });
            _.forEach(data_predict[i], (k,row)=>{
                let value_row = data_predict[i][row].toString().toUpperCase();
                values.push(collection_training.indexOf(value_row));
            });
            tensor.push(tf.oneHot(tf.tensor1d(values,dtype='int32'), collection_training.length));
        }else if(data['type']=='normalize'){
            _.forEach(data_predict[i], (k,row)=> {
                values.push(((parseFloat(data_predict[i][row]) - data['opts']['mean'])/data['opts']['std']));
            });
            tensor.push(tf.tensor1d(values,dtype='float32').expandDims(-1));
        }else if(data['type']=='numeric'){
            _.forEach(data_predict[i], (k,row)=> {
                values.push(((parseFloat(data_predict[i][row]) - data['opts']['min'])/(data['opts']['max'] - data['opts']['min'])));
            });
            tensor.push(tf.tensor1d(values,dtype='float32').expandDims(-1));
        }
    });
    var tensors_eval = (tensor.length>1)?tf.concat(tensor,1):tensor[0];

    // read model and predict
    results = model.predict(tensors_eval);
    let results_split = _.chunk(Array.from(results.dataSync()), results.shape[1]);

    _.forEach(results_split, (val,key)=>{
        let data = {'labels':[], 'results':val};
        _.forEach(_.split(key_data, ','), (v, k)=>{
            data['labels'].push(data_predict[v][key]);
        });
        data_results.push(data);
    });

    return data_results;
}

function validatePredictData(data_predict){
    if(typeof data_predict!= 'undefined' && isJSON(data_predict)){
        let from_training = Object.keys(data_training['features']);
        let from_predict = Object.keys(data_predict);
        // Comparison of arrays using name of keys
        if(compareKeys(from_training,from_predict)){
            let shape_qty = 0;
            _.forEach(data_training['features'], (data,i)=> {
                if(shape_qty != data_predict[i].length && shape_qty!=0) return false;
                shape_qty = data_predict[i].length;
            });
            if(shape_qty>0)return true;
        }
    }
    return false;
}

function isJSON(item) {
    item = typeof item !== "string"? JSON.stringify(item): item;
    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }
    if (typeof item === "object" && item !== null) return true;
    return false;
}

function compareKeys(array1,array2){
    return array1.length === array2.length &&
        array1.sort().every(function(value, index) {
            return value === array2.sort()[index]
        });
}

async function get_prediction(model_n,data_predict, key_data=""){
    //if (_.isEmpty(url_model)) return false;
    if(model_n!=model_name){
        model_name = model_n;
        let response = await fetch(url_model+model_name+"/"+model_name+".json");
        data_training = await response.json();
        if(validatePredictData(data_predict)){
            model = await tf.loadLayersModel(url_model+model_name+'/model.json');
            model.compile({loss: 'sparseCategoricalCrossentropy', optimizer: 'rmsprop'});
        }else{
            return;
        }
    }
    return PredictionModel(data_predict, key_data);
}






