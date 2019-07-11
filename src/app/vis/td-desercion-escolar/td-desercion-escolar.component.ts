import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import {DataPrediction} from '../../models/data-prediction';
@Component({
  selector: 'app-td-desercion-escolar',
  templateUrl: './td-desercion-escolar.component.html',
  styleUrls: ['./td-desercion-escolar.component.css']
})
export class TdDesercionEscolarComponent implements OnInit, OnChanges {
  @ViewChild('barChart')
  private chartContainer: ElementRef;

  @Input()
  data: DataPrediction[];

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  constructor() { }

  ngOnInit() { }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

private createChart(): void {
    d3.select('svg').remove();
    const element = this.chartContainer.nativeElement;
    const height = 300;
    const width = 800; // element.offsetWidth
    const data = this.data;
    const tooltip = d3.select('body').append('div').attr('class', 'toolTip');
    const svg = d3.select(element).append('svg')
      .attr('width', width + 'px')
      .attr('height', height + 'px');

    const contentWidth = width - this.margin.left - this.margin.right;
    const contentHeight = height - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.name));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, 1]); // d3.max(data, d => d.value)

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Valor');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.value))
      .attr('fill', '#beaed4')
      .on('mousemove', (d) => {
            tooltip
              .style('left', d3.event.pageX - 50 + 'px')
              .style('top', d3.event.pageY - 70 + 'px')
              .style('display', 'inline-block')
              .html((d.name) + '<br>' + (d.value));
      }).on('mouseout', (d) => { tooltip.style('display', 'none'); });
  }

}
