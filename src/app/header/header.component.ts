import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dataCarrera: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.data.subscribe(data => {
      this.dataCarrera = data;
    })
  }

}
