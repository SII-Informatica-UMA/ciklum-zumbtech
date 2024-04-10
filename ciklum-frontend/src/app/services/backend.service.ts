import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Usuario } from "../entities/usuario";
import { HttpClient } from "@angular/common/http";
import { BACKEND_URI } from "../config/config";
import { JwtResponse } from "../entities/login";
import { Centro, Entrenador, EntrenadorP, Plan, PlanD, PlanE, Rutina, Sesion, SesionP, asociacion } from "../entities/sesion";

// Este servicio usa el backend real

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {}

  getEntrenador(idEntrenador: number): Observable<Entrenador> {
    return this.httpClient.get<Entrenador>(BACKEND_URI + '/entrenador/' + idEntrenador);
  }

  postCentro(nombre:string, direccion:string): Observable<Centro> {
    return this.httpClient.post<Centro>(BACKEND_URI + '/centro', {nombre: nombre, direccion: direccion});
  }

  postEntrenador(entrenador: EntrenadorP, idCentro: number): Observable<Entrenador> {
    return this.httpClient.post<Entrenador>(BACKEND_URI + '/entrenador?centro=' + idCentro, entrenador);
  }

  postAsociación(idCliente: number, idEntrenador: number, especialidad: string): Observable<asociacion> {
    return this.httpClient.post<asociacion>(BACKEND_URI + '/entrena?entrenador=' + idEntrenador, 
      {idEntrenador: idEntrenador, idCliente: idCliente, especialidad: especialidad});
  }

  getAsociaciones(idCliente: number): Observable<asociacion[]> {
    return this.httpClient.get<asociacion[]>(BACKEND_URI + "/entrena?cliente=" + idCliente)
  }

  putPlan(rutina: Rutina, idP: number): Observable<Rutina> {
    return this.httpClient.put<Rutina>(BACKEND_URI + "/plan/" + idP, rutina);
  }

  deletePlan(idP: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + "/plan/" + idP);
  }

  postPlan(plan:PlanE, idAsociación: number | undefined): Observable<Rutina> {
    return this.httpClient.post<Rutina>(BACKEND_URI + '/plan?entrena=' + idAsociación, 
    plan);
  }

  getPlanes(idE: number | undefined): Observable<PlanD[]> {
    return this.httpClient.get<PlanD[]>(BACKEND_URI + '/plan?entrena=' + idE);
  }

  getSesion(id: number): Observable<Sesion> {
    return this.httpClient.get<Sesion>(BACKEND_URI + '/sesion/' + id); 
  }

  getSesiones(id: number): Observable<Sesion[]> {
    return this.httpClient.get<Sesion[]>(BACKEND_URI + '/sesion?plan=' + id); 
  }

  putSesion(id: number, sesion: SesionP): Observable<Sesion> {
    return this.httpClient.put<Sesion>(BACKEND_URI + '/sesion/' + id, sesion);
  }

  deleteSesion(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/sesion/' + id);
  }

  postSesion(id: number, sesion: SesionP) {
    return this.httpClient.post<Sesion>(BACKEND_URI + '/sesion?plan=' + id, sesion);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(BACKEND_URI + '/usuario');
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(BACKEND_URI + '/usuario', usuario);
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(BACKEND_URI + '/usuario/' + usuario.id, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/usuario/' + id);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(BACKEND_URI + '/usuario/' + id);
  }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post<JwtResponse>(BACKEND_URI + '/login', {email: email, password: password})
      .pipe(map(jwtResponse => jwtResponse.jwt));
  }

  forgottenPassword(email: string): Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/forgottenpassword', {email: email});
  }

  resetPassword(token: string, password: string): Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/passwordreset', {token: token, password: password});
  }
}
