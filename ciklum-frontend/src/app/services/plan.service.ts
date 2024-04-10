import { Injectable, numberAttribute } from "@angular/core";
import { Login, UsuarioSesion, Rol, RolCentro } from "../entities/login";
import { Observable, of, forkJoin, concatMap, lastValueFrom } from "rxjs";
import {map} from 'rxjs/operators';
import * as jose from 'jose';

import { Usuario } from "../entities/usuario";
import { BackendFakeService } from "./backend.fake.service";
import { BackendService } from "./backend.service";
import { LoginComponent } from "../login/login.component";
import { Centro, Entrenador, EntrenadorP, Plan, PlanD, PlanE, Rutina, Sesion, asociacion } from "../entities/sesion";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private backend: BackendService) {}

  /*getSesion(id: number): Observable<Sesion> {
    return this.backend.getSesion(id);
  }

  getSesiones(id: number): Observable<Sesion[]> {
    return this.backend.getSesiones(id);
  }

  putSesion(id: number, sesion: Sesion): Observable<Sesion> {
    return this.backend.putSesion(id, sesion);
  }

  deleteSesion(id: number): Observable<void> {
    return this.backend.deleteSesion(id);
  }

  postSesion(id: number, sesion: Sesion) {
    return this.backend.postSesion(id, sesion);
  }

  postEntrena(idClienteEntrenador: number, especialidad: string): Observable<entrenadorCliente> {
    return this.backend.postEntrena(idClienteEntrenador, especialidad);
  }*/

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

  postSesion(sesion: Sesion, idPlan: Number): Observable<Sesion> {
    return this.backend.postSesion(idPlan.valueOf(), sesion);
  }

  putSesion(sesion: Sesion, idSesion: Number): Observable<Sesion> {
    return this.backend.putSesion(sesion.id.valueOf(), sesion);
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
