import { Component, OnInit, Input, ElementRef, SimpleChanges } from '@angular/core';
import { D3VisComponent } from '../d3-vis/d3-vis.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-td-origen-escolar',
  templateUrl: './td-origen-escolar.component.html',
  styleUrls: ['./td-origen-escolar.component.css']
})
export class TdOrigenEscolarComponent extends D3VisComponent implements OnInit {

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
  width: any = 500;
  height: any = 500;
  mainContainer: any;
  color: d3.ScaleLinear<string, string>;

  constructor(
    private elRef: ElementRef,
  )
  {
    super(elRef);
    this.color =d3.scaleLinear<string>()
      .domain([0, 5])
      .range(["hsl(152,80%,80%)","hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl)
    
  }
  

  ngOnInit() {
    super.ngOnInit();
    this.initialized = true;
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.initialized) {
      this.render();
    }
  }






  

  
  render() {
    const entries = ({
      name:"root",
      values: d3.nest()
     .key(function(d:any) { return d.comuna_rbd; })
     .entries(this.data)})

    const root = this.pack(entries);

    this.mainContainer.selectAll("g").remove()
    
    const node = this.mainContainer.append("g")
    .selectAll("g.circle")
    .data(root.descendants().slice(1))
    .join("g")
    .attr("transform", d => `translate(${(d.x)},${(d.y) })`)
      //.attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseenter", function(d) { 
        d.highlighted = true;
        //renderText();
        debugger;
        if (d.depth > 1) {
          this.parentNode.appendChild(this);
          d3.select(this).attr("stroke", "black"); 
          d3.select(this).select("g.label").attr("opacity", 1); 
        }
      })
      .on("mouseout", function(d) { 
        d.highlighted = false;
        d3.select(this).attr("stroke", "none"); 
        d3.select(this).select("g.label").attr("opacity", 0); 

      })      
      .on("click", function(d) { 
        d3.select(this).attr("fill", "red"); 
      })
    
      node.append("circle")
      .style("cursor", "pointer")
      .attr("fill", d => d.children ? this.color(d.depth) : "white")
      .attr("r", d => d.r )
    
      node.append("text")
      .classed("metric",true) 
      .attr("pointer-events",  "none" )

      .attr("stroke", "none")
      .attr("opacity",  1)
      .attr("text-anchor", "middle")
      .attr("dy", 2)
      .attr("font-size", 6)
      .attr("font-family", "sans-serif")
      .text(d => d.data.count > 1 ? d.data.count : "")
    

    
   
    const label = node.append("g")
      .classed("label",true) 
      .attr("stroke", "none") 
      .attr("opacity",  0)
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    
     label.append("rect")
      .attr("fill", "white")
      .attr("y", d => d.r + 2)

    label
      .append("text")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("dy", d => d.r +10)
      .style("display", d => d.parent === root ? "inline" : "inline")
      .text(d => d.data.nom_rbd)
      .call(this.getBB);
  
    label
      .append("text")
      .attr("font-size", 8)
      .attr("font-family", "sans-serif")
      .attr("dy", d => d.r +20)
      .style("display", d => d.parent === root ? "inline" : "inline")
      .text(d => d.data.comuna_rbd);
    
    label.select("rect")
      .attr("width", d => d.bbox.width)
      .attr("x", d => {
        debugger;
        return -d.bbox.width/2
      })
      .attr("height", 10+8+2 )
    
  }
  

  pack(data) {
    return d3.pack()
    .size([this.width, this.height])
    .padding(3)
    (d3.hierarchy(data, d => d.values)
    .sum(d => d.count)
    .sort((a:any, b:any) => b.count - a.count))
  }

  


  getBB(selection) {
        selection.each(function(d){d.bbox = this.getBBox();})
  }

}
