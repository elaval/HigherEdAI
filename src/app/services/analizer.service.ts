import { Injectable } from '@angular/core';
import * as d3 from "d3";

@Injectable({
  providedIn: 'root'
})
export class AnalizerService {

  constructor(

  ) { 

  }

  topSchools(data) {
    const focusData = data && data.origenEscolar.filter((d) => d.rbd);
    const totalCount = focusData.reduce((memo, d) => memo + d.count, 0);

    const avg = d3.mean(focusData, d => d["count"]);
    const dev = d3.deviation(focusData, d => d["count"]);
    const top = focusData.filter(d => d["count"] > avg + dev);

    return top
  }

  topCarreras(data) {
    const focusData = data && data.filter((d) => d.codigo_unico);
    const totalCount = focusData.reduce((memo, d) => memo + d.count, 0);

    const avg = d3.mean(focusData, d => d["count"]);
    const dev = d3.deviation(focusData, d => d["count"]);
    const top = focusData.filter(d => d["count"] > avg + dev);

    return top
  }
}
