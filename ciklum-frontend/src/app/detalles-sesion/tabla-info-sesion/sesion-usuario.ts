import { Usuario } from "./Usuario";

export interface sesion_user {
    usuario: Usuario;
    entrenador: Usuario;
    lpm: number;
    cal_consumidas: number;
    tiempo_ejercicio: number;
}