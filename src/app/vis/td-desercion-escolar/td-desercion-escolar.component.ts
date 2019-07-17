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
  @Input()
  destacar = [];
  id: string;
  // margin = { top: 20, right: 20, bottom: 30, left: 40 };
  margin = { top: 20, right: 0, bottom: 30, left: 40 };

  constructor() { }

  ngOnInit() {this.id = Math.floor((Math.random() * 100000) + 1).toString();}

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

private createChart(): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).select('svg').remove();
    const height = 300;
    const width = element.offsetWidth; //
    const data = this.data;
    const tooltip = (!d3.select('body').select('div.tooltip').empty()) ?
      d3.select('body').select('div.tooltip') :
      d3.select('body').append('div').attr('class', 'tooltip')
        .style('opacity', 0).style('background', '#000')
        .style('padding', '5px');
    // const tooltip = d3.select(element).append('div').attr('class', 'tooltip').style('opacity', 0);
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
      .on('mouseover', (d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`Deserción: <span>${Math.round(d.value * 1000) / 10}%</span>`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${(d3.event.pageY - 40)}px`)
          // .style('left', `${d3.event.clientX - element.getBoundingClientRect().x - 10}px`)
          // .style('top', `${(d3.event.clientY - element.getBoundingClientRect().y -  - 10)}px`)
          .style('display', 'inline-block');
  })
  .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));
  }

}
