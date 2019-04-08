import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as _ from 'lodash';
import { AnalizerService } from 'src/app/services/analizer.service';

@Component({
  selector: 'app-destino-es',
  templateUrl: './destino-es.component.html',
  styleUrls: ['./destino-es.component.css']
})
export class DestinoESComponent implements OnInit {
  dataCarrera: any;
  data: any;

  constructor(    
    private dataService: DataService,
    private analizerService: AnalizerService
    ) 
  { 
      this.dataService.data.subscribe(data => {
        this.data = this.analizerService.topCarreras(data.destinoES);
      })
  }

  ngOnInit() {
  }

}
