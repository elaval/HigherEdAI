import { Injectable } from '@angular/core';
import { MatriculaData } from 'src/app/models/matricula';
import * as _ from "lodash";
import * as d3 from "d3";

export interface Node {
  id: number;
  numeroEstudiantes: number;
  numeroEstudiantesAlInicio: number;
  height: number;
  width: number;
  widthInicio: number;
  y: number;
  data: any;
}

export interface NodeDependencia {
  numeroEstudiantes: number;
  x: number;
  width: number;
  height: number;
  percentage: number;
  dataDependencia: {};
}

@Injectable({
  providedIn: 'root'
})
export class MatriculaEvolucionLayoutService {

  height = 1;
  width = 1;
  _data: MatriculaData;
  maxNumeroEstudiantesPorGrado = 0;
  maxNumeroGeneracionsPorAgno = 0;
  matriculaAgnoIngreso = {};

  constructor() { }

  /*
  Data arrives in the format:
  0: {agno: "2009", generaciones: Array(1)}
  1:
    agno: "2010"
    generaciones: Array(2)
      0: {year: 2, count: 76}
      1: {year: 1, count: 78}

  2: {agno: "2011", generaciones: Array(3)}
  */
  data(data: MatriculaData) {
    this._data = data;
    this.matriculaAgnoIngreso= {};

    // Get the max number of students in eny year
    this._data.forEach(d => {
      d.generaciones.forEach(e => {
        this.maxNumeroEstudiantesPorGrado = e.count > this.maxNumeroEstudiantesPorGrado 
        ? e.count
        : this.maxNumeroEstudiantesPorGrado;

        if (+e.year == 1) {
          this.matriculaAgnoIngreso[d.agno] = e.count;
        }
      })

      this.maxNumeroGeneracionsPorAgno = d.generaciones.length > this.maxNumeroGeneracionsPorAgno 
        ? d.generaciones.length
        : this.maxNumeroGeneracionsPorAgno;

    })

    return this;
  }

  nodes(year: string) {
    const data = this._data.find(d => d.agno == year);
    let nodes: Node[] = [];
    let numNodes = 0;
    const maxNumEstudiantes = this.maxNumeroEstudiantesPorGrado;
    
    const generaciones = this.normaliseGeneraciones(data.generaciones);

    _.each(_.sortBy(generaciones, d=> d.year), (d:any) => {
      const agnoInicio = +d.year < 90 ? +year - d.year + 1 : 99;
      const record: Node = {
        id: agnoInicio,
        numeroEstudiantes: d.count,
        numeroEstudiantesAlInicio: this.matriculaAgnoIngreso[agnoInicio],
        height: 0,
        width: 0,
        widthInicio: 0,
        y: 0,
        data: d,
      };
      nodes.push(record);
      numNodes++;
    });

    const rowHeight = this.height / this.maxNumeroGeneracionsPorAgno;
    const widthScale = d3.scaleLinear().domain([0, maxNumEstudiantes]).range([ 0, this.width ] );

    let currentY = 0;

    // Node params for each grado
    nodes.forEach((d) => {
      d.height = rowHeight;
      d.width = widthScale(d.numeroEstudiantes);
      d.widthInicio = widthScale(d.numeroEstudiantesAlInicio);
      d.y = currentY;
      currentY += rowHeight;
    });

    return _.sortBy(nodes, d => -d.id);
  }

  /*
    Si una de las generaciones tiene año negativo o mayor a 100, se asume un caso especial y se codifica con año 99 agregando los datos
  */
  normaliseGeneraciones(generaciones) {
    const output = [];

    const registroEspecial = {
      year: 99,
      count: 0
    }

    generaciones.forEach(d => {
      if (d.year > 0 && d.year < 90) {
        output.push(d)
      } else {
        registroEspecial.count += d.count;
      }
    })

    if (registroEspecial.count > 0) {
      output.push(registroEspecial);
    }
    return output
  }
}