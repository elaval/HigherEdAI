import * as _ from 'lodash';

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

interface GeneracionRecord {
  year: number,
  count:number
}

interface MatriculaRecord {
  agno: string,
  generaciones : GeneracionRecord[]
}

export interface MatriculaData extends Array<MatriculaRecord>{}

export interface MatriculaYear {
  desc: string;
  id: string;
  numeroEstudiantes: number;
  itemsEnsenanza: MatriculaEnseñanza[];
}

export interface MatriculaEnseñanza {
  desc: string;
  id: string;
  numeroEstudiantes: number;
  itemsGrado: MatriculaGrado[]
}

export interface MatriculaGrado {
  desc: string;
  id: string;
  numeroEstudiantes: number;
  itemsDependencia: MatriculaDependencia[];
}

export interface MatriculaDependencia {
  desc: string;
  id: string;
  numeroEstudiantes: number;
}

const COD_ENS3_MAP = {
  1: 'Educación Parvularia',
  2: 'Enseñanza Básica Niños',
  3: 'Educación Básica Adultos',
  4: 'Enseñanza Media Humanístico Científica Jóvenes',
  5: 'Educación Media Humanístico Científica Adultos',
  6: 'Enseñanza Media Técnico Profesional y Artística, Jóvenes',
  7: 'Educación Media Técnico Profesional y Artística, Adultos',
  101: 'Educación Media'
};


const COD_DEPE2_MAP = {
  1: 'Municipal',
  2: 'Particular Subvencionado',
  3: 'Particular Pagado (o no subvencionado)',
  4: 'Corporación de Administración Delegada (DL 3166)'
};

const COD_GRADO2_MAP = {
  1 : {
    1: 'Sala Cuna',
    2: 'Nivel Medio Menor',
    3: 'Nivel Medio Mayor',
    4: 'Pre-kinder',
    5: 'Kinder'
  },
  2 : {
    1: '1º Básico',
    2: '2º Básico',
    3: '3º Básico',
    4: '4º Básico',
    5: '5º Básico',
    6: '6º Básico',
    7: '7º Básico',
    8: '8º Básico'
  },

  4 : {
    1: '1º Medio',
    2: '2º Medio',
    3: '3º Medio',
    4: '4º Medio',
  },
  5 : {
    1: '1º Medio',
    2: '2º Medio',
    3: '3º Medio',
    4: '4º Medio',
  },
  101 : {
    1: '1º Medio',
    2: '2º Medio',
    3: '3º Medio',
    4: '4º Medio',
  }

}


