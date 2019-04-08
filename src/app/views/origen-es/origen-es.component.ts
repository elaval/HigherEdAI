import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AnalizerService } from 'src/app/services/analizer.service';

@Component({
  selector: 'app-origen-es',
  templateUrl: './origen-es.component.html',
  styleUrls: ['./origen-es.component.css']
})
export class OrigenESComponent implements OnInit {

  dataCarrera: any;
  data: any;

  constructor(    
    private dataService: DataService,
    private analizerService: AnalizerService
    ) 
  { 
      this.dataService.data.subscribe(data => {
        this.data = this.analizerService.topCarreras(data.origenES);
      })
  }

  ngOnInit() {
  }

}
