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
    sesiones: Sesion[]
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