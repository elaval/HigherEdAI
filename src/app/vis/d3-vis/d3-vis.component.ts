import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-vis',
  templateUrl: './d3-vis.component.html',
  styleUrls: ['./d3-vis.component.css']
})
export class D3VisComponent implements OnInit {

  @Input()
  margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  };

  @Input()
  height = 500;

  width= 500;

  svgContainer: d3.Selection<d3.BaseType, {}, null, undefined>; ;  // <svg>
  mainContainer: d3.Selection<d3.BaseType, {}, null, undefined>; // Root <g> element within <svg>

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {

    // Select first svg element (or create one if does not exists)
    d3.select(this.elementRef.nativeElement).selectAll('svg')
    .data(['svg'])
    .enter().append('svg');

    this.svgContainer = d3.select(this.elementRef.nativeElement).select('svg');

    this.svgContainer
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.updateContainerSize();

    this.mainContainer = this.svgContainer.append('g')
      .attr('class', 'mainContainer')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);


    // Adjust element size on window resize
    d3.select(window)
    .on('resize', () => {
      this.updateContainerSize();
      this.render();
    });

    this.render();

  }

  updateContainerSize() {
    const myNode: HTMLElement = <HTMLElement>this.svgContainer.node();
    const parentNode: HTMLElement = <HTMLElement>myNode.parentNode.parentNode;
    const parentStyle = getComputedStyle(parentNode);
    const paddingLeft = parseFloat(parentStyle.paddingLeft);
    const paddingRight = parseFloat(parentStyle.paddingRight);

    const width = parentNode.getBoundingClientRect().width - paddingLeft - paddingLeft;

    this.width =  width - this.margin.left - this.margin.right;
    this.svgContainer
      .attr('width', this.width + this.margin.left + this.margin.right);
  }

  render() {}

}
