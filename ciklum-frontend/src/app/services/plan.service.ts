import { Injectable, numberAttribute } from "@angular/core";
import { Login, UsuarioSesion, Rol, RolCentro } from "../entities/login";
import { Observable, of, forkJoin, concatMap, lastValueFrom } from "rxjs";
import {map} from 'rxjs/operators';
import * as jose from 'jose';

import { Usuario } from "../entities/usuario";
import { BackendFakeService } from "./backend.fake.service";
import { BackendService } from "./backend.service";
import { LoginComponent } from "../login/login.component";
import { Plan, Rutina, Sesion, entrenadorCliente } from "../entities/sesion";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private backend: BackendFakeService) {}

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

  getPlanes(idE: number | undefined): Observable<Plan[]> {
    return this.backend.getPlanes(idE);
  }

  postPlan(fInicio: Date, fFinal: Date, rRecurrencia: string, idE: number | undefined): Observable<Rutina> {
    return this.backend.postPlan(fInicio, fFinal, rRecurrencia, idE);
  }

  deletePlan(idP: number) {
    this.backend.deletePlan(idP);
  }

  postSesion(sesion: Sesion, idPlan: Number): Observable<Sesion[]> {
    return this.backend.postSesion(sesion,idPlan);
  }

  deleteSesion(idP: Number, idSesion: Number) {
    this.backend.deleteSesion(idP, idSesion);
  }

  getSesiones(idPlan: Number): Observable<Sesion[]> {
    return this.backend.getSesiones(idPlan)
  }

}
