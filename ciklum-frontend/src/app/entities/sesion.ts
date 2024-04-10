export interface Sesion {
    idPlan: Number,
    inicio: Date,
    fin: Date,
    trabajoRealizado: string,
    multimedia: string[],
    decripcion: string,
    presencial: boolean,
    datosSalud: string[],
    id: Number
}
export class SesionImpl implements Sesion {
    idPlan: Number;
    inicio: Date;
    fin: Date;
    trabajoRealizado: string;
    multimedia: string[];
    decripcion: string;
    presencial: boolean;
    datosSalud: string[];
    id: Number;

    constructor() {
        this.idPlan = 0;
        this.inicio = new Date();
        this.fin = new Date();
        this.trabajoRealizado = "";
        this.multimedia = [];
        this.decripcion = "";
        this.presencial = true;
        this.datosSalud = [];
        this.id = 0;
    }
}

export interface SesionP {
    idPlan: Number,
    inicio: Date,
    fin: Date,
    trabajoRealizado: string,
    multimedia: string[],
    decripcion: string,
    presencial: boolean,
    datosSalud: string[],
}

export interface Plan {
    planId: Number,
    userId: Number | undefined,
    sesiones: Sesion[],
}

export interface entrenadorCliente {
    idEntrenador: Number,
    idCliente: Number, 
    especialidad: string, 
    id: Number,
    planes: Plan[]
}

export interface Rutina {
    fechaInicio: Date,
    fechaFin: Date,
    reglaRecurrencia: string,
    idRutina: number | undefined,
    id: number
  }