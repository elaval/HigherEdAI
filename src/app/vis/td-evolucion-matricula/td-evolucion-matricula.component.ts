import { Component, OnInit, ElementRef, Input, SimpleChanges } from '@angular/core';
import { MatriculaEvolucionLayoutService } from './matricula-evolucion-layout.service';
import * as d3 from "d3";
import { D3VisComponent } from '../d3-vis/d3-vis.component';

@Component({
  selector: 'app-td-evolucion-matricula',
  templateUrl: './td-evolucion-matricula.component.html',
  styleUrls: ['./td-evolucion-matricula.component.css'],
  providers: [ MatriculaEvolucionLayoutService ]
})
export class TdEvolucionMatriculaComponent extends D3VisComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  year = '2016';
  
  margin = {
    left: 200,
    right: 100,
    top: 10,
    bottom: 10
  };

  private rowHeight = 20;
  private rowSpace = 2;

  colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  formatPercent = d3.format('.0%');
  formatNumberEstudiantes = d3.format('d');

  //legendData: LegendRecord[] = null;

  initialized = false;
  legendData: { color: string; label: string; }[];
  width: any;
  height: any;
  mainContainer: any;

  constructor(
    private elRef: ElementRef,
    private matriculaLayoutService: MatriculaEvolucionLayoutService)
  {
    super(elRef);
  }
  

  ngOnInit() {
    super.ngOnInit();
    this.initialized = true;
  }

  render() {
    let a = 0;
    a = 1;
    if (this.data && this.year) {

      this.matriculaLayoutService.data(this.data)
      const nodes = this.matriculaLayoutService.nodes(this.year);

      let rows = this.mainContainer.selectAll('.row')
      .data(nodes, (d) => d['id']);

      rows.exit().remove();

      const newRows = rows.enter().append('g')
      .attr('class', 'row')
      .attr('transform', (d) => `translate(0, ${d.y * this.height})`)

      newRows
      .append('rect')
      .attr('class', 'firstYear')

      newRows
      .append('rect')
      .attr('class', 'current')

      newRows
      .append('text')
      .attr('class', 'label');

      newRows
      .append('text')
      .attr('class', 'total current');

      newRows
      .append('text')
      .attr('class', 'total firstYear');

      rows = newRows
      .merge(rows);

      rows
      .transition()
      .duration(1000)
      .attr('transform', (d) => `translate(0, ${d.y * this.height})`)
      ;

      rows.select('text.label')
      //.text((d) => d.data['year'] )
      .text((d) => +d.id > 99 ? +this.year - +d.id +1 : 99)
      .attr('text-anchor', 'end')
      .attr('dy', (d) => d.height * this.height / 2)
      .attr('dx', -10)
      ;

      rows.select('text.total.current')
      .transition()
      .text((d) => this.formatNumberEstudiantes(d.numeroEstudiantes))
      .attr('text-anchor', 'end')
      .attr('dy', (d) => d.height * this.height / 2)
      .attr('dx', (d) => d.width * this.width + 5)
      ;

      rows.select('text.total.firstYear')
      .transition()
      .text((d) => this.formatNumberEstudiantes(d.numeroEstudiantesAlInicio))
      .attr('text-anchor', 'end')
      .attr('dy', (d) => d.height * this.height / 2)
      .attr('dx', (d) => d.widthInicio * this.width + 5)
      .attr('opacity', d => d.numeroEstudiantesAlInicio ? 0.5 : 0)
      ;

      rows.select('rect.current')
      .transition()
      .attr('height', (d) => d.height * this.height - 2)
      .attr('width', (d) => d.width * this.width + 10)
      .attr('fill', "#beaed4")
      ;

      rows.select('rect.firstYear')
      .transition()
      .attr('height', (d) => d.height * this.height - 2)
      .attr('width', (d) => d.widthInicio * this.width + 10)
      .attr('fill', "#ccc")
      ;

    }

    this.legendData =  this.colorScale.domain().map((d) => {
      return {
        color: this.colorScale(d),
        label: d

      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.initialized) {
      this.render();
    }
  }

}
