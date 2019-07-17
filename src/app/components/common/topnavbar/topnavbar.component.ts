import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { DataService } from 'src/app/services/data.service';
import * as _ from "lodash";
declare var jQuery: any;

@Component({
    selector: 'app-topnavbar',
    styleUrls: ['./topnavbar.css'],
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent {
    searchText: string;
    carrerasByNivel: any;

    constructor(
        private dataService:DataService
    ) {
        this.dataService.getIEs()
        .then(d => {

            console.log(this.dataService.selectedSede)
            this.carrerasByNivel = this.carrerasGroupedByNivel(this.dataService.selectedSede.carreras)

        })

        /*this.dataService.getCarreras(39)
        .then(d => {
            console.log(d)
        })
        */
    }

    carrerasGroupedByNivel(carreras) {
        const groups = _.chain(carreras)
        .groupBy(d => d["carrera_nivel_global"])
        .map((items,key) => ({nivel:key, carreras:_.sortBy(items, d => d["nomb_carrera"])}))
        .value();

        return groups
    }

    onSelectIes(ies) {
        this.dataService.getCarreras(ies.cod_inst).then(d => {
            this.carrerasByNivel = this.carrerasGroupedByNivel(this.dataService.selectedSede.carreras);
        });
    }

    onSelectSede(sede) {
        this.carrerasByNivel = this.carrerasGroupedByNivel(sede.carreras)
        this.dataService.onSelectCarrera(sede.carreras[0])
    }

    toggleNavigation(): void {
        jQuery('body').toggleClass('mini-navbar');
        smoothlyMenu();
    }



    onEnter(question) {
    }

}
