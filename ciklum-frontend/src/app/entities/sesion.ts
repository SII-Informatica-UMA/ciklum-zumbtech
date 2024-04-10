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
    fechaInicio: Date,
    fechaFin: Date,
    reglaRecurrencia: string,
    idRutina: number,
    planId: Number,
    userId: Number | undefined,
    sesiones: Sesion[],
}

export interface PlanD {
    fechaInicio: Date,
    fechaFin: Date,
    reglaRecurrencia: string,
    idRutina: number,
    id: number
}

export interface PlanE {
    fechaInicio: Date,
    fechaFin: Date,
    reglaRecurrencia: string,
    idRutina: number,
}

export interface Rutina {
    fechaInicio: Date,
    fechaFin: Date,
    reglaRecurrencia: string,
    idRutina: number | undefined,
    id: number
}

export interface asociacion {
    idEntrenador: number,
    idCliente: number,
    especialidad: string,
    id: number,
    planes: Plan[]
}

export interface EntrenadorP {
    idUsuario: number,
    telefono: string,
    direccion: string,
    dni: string,
    fechaNacimiento: Date,
    fechaAlta: Date,
    fechaBaja: Date,
    especialidad: string,
    titulacion: string,
    experiencia: string,
    observaciones: string,
  }

export interface Entrenador {
    idUsuario: number,
    telefono: string,
    direccion: string,
    dni: string,
    fechaNacimiento: Date,
    fechaAlta: Date,
    fechaBaja: Date,
    especialidad: string,
    titulacion: string,
    experiencia: string,
    observaciones: string,
    id: number
  }

export interface Centro {
    nombre: string,
    direccion: string,
    idCentro: number
}
