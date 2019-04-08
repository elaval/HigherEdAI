import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatriculaData } from 'src/app/models/matricula';

@Component({
  selector: 'app-evolucion-matricula',
  templateUrl: './evolucion-matricula.component.html',
  styleUrls: ['./evolucion-matricula.component.css']
})
export class EvolucionMatriculaComponent implements OnInit {
    data: MatriculaData;
    agnos: any;
    selectedYear: any;
  
    constructor(
      private dataService: DataService
    ) { }
  
    ngOnInit() {
      this.dataService.selectedCarreraObservable
      .subscribe(carrera => {
        if (carrera && carrera.codigo_unico) {
          this.dataService.dataMatricula(carrera.codigo_unico)
          .then((data:MatriculaData) => {
            this.data = data;
            this.agnos = this.data.map(d => d.agno)
            this.selectedYear = this.agnos[this.agnos.length-1]
          })
          .catch(err => {
            console.error(err)
          })
        }
      })
  
    }
  
    changeYear(year) {
      this.selectedYear = year;
    }
  
  
  }