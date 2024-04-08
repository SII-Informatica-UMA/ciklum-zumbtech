import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Usuario } from "../entities/usuario";
import { HttpClient } from "@angular/common/http";
import { BACKEND_URI } from "../config/config";
import { JwtResponse } from "../entities/login";
import { Plan, Rutina, Sesion, SesionP, entrenadorCliente } from "../entities/sesion";

// Este servicio usa el backend real

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {}

  postEntrena(idClienteEntrenador: number, especialidad: string): Observable<entrenadorCliente> {
    return this.httpClient.post<entrenadorCliente>(BACKEND_URI + '/entrena?entrenador=' + idClienteEntrenador, 
      {idEntrenador: idClienteEntrenador, idCliente: idClienteEntrenador, especialidad: especialidad});
  }

  postPlan(fInicio: Date, fFinal: Date, rRecurrencia: string, idE: number | undefined): Observable<Rutina> {
    return this.httpClient.post<Rutina>(BACKEND_URI + '/plan?entrena=' + idE, 
    {fechaIncio: fInicio, fechaFin: fFinal, reglaRecurrencia: rRecurrencia, idRutina: 0});
  }

  getPlanes(idE: number | undefined): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(BACKEND_URI + '/plan?entrena=' + idE);
  }

  getSesion(id: number): Observable<Sesion> {
    return this.httpClient.get<Sesion>(BACKEND_URI + '/sesion/' + id); 
  }

  getSesiones(id: number): Observable<Sesion[]> {
    return this.httpClient.get<Sesion[]>(BACKEND_URI + '/sesion/?plan=' + id); 
  }

  putSesion(id: number, sesion: SesionP): Observable<Sesion> {
    return this.httpClient.put<Sesion>(BACKEND_URI + '/sesion/' + id, sesion);
  }

  deleteSesion(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/sesion/' + id);
  }

  postSesion(id: number, sesion: Sesion) {
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
