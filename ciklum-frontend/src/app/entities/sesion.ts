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

export interface Plan {
    planId: Number,
    sesiones: Sesion[]
}