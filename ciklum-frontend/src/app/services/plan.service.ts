import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BackendService } from "./backend.service";
import { Centro, Entrenador, EntrenadorP, Plan, PlanD, PlanE, Rutina, Sesion, SesionP, asociacion } from "../entities/sesion";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private backend: BackendService) {}

  getEntrenador(idCentro: number): Observable<Entrenador> {
    return this.backend.getEntrenador(idCentro);
  }

  getPlanes(idE: number | undefined): Observable<PlanD[]> {
    return this.backend.getPlanes(idE);
  }

  postPlan(plan:PlanE, idE: number | undefined): Observable<Rutina> {
    return this.backend.postPlan(plan, idE);
  }

  putPlan(rutina: Rutina, idP: number): Observable<Rutina> {
    return this.backend.putPlan(rutina, idP);
  }

  deletePlan(idP: number): Observable<void> {
    return this.backend.deletePlan(idP);
  }

  getAsociaciones(idCliente: number): Observable<asociacion[]> {
    return this.backend.getAsociaciones(idCliente);
  }

  postSesion(sesion: SesionP, idPlan: Number): Observable<Sesion> {
    return this.backend.postSesion(idPlan.valueOf(), sesion);
  }

  putSesion(sesion: Sesion, idSesion: Number): Observable<Sesion> {
    return this.backend.putSesion(idSesion.valueOf(), sesion);
  }

  deleteSesion(idSesion: Number): Observable<void> {
    return this.backend.deleteSesion(idSesion.valueOf());
  }

  getSesiones(idPlan: Number): Observable<Sesion[]> {
    return this.backend.getSesiones(idPlan.valueOf());
  }

  postCentro(nombre:string, direccion:string): Observable<Centro> {
    return this.backend.postCentro(nombre, direccion);
  }

  postEntrenador(entrenador: EntrenadorP, idCentro: number): Observable<Entrenador> {
    return this.backend.postEntrenador(entrenador, idCentro);
  }

  postAsociación(idCliente: number, idEntrenador: number, especialidad: string): Observable<asociacion> {
    return this.backend.postAsociación(idCliente, idEntrenador, especialidad);
  }
}
