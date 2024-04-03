import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Usuario } from "../entities/usuario";
import { HttpClient } from "@angular/common/http";
import { BACKEND_URI } from "../config/config";
import { JwtResponse } from "../entities/login";

// Este servicio usa el backend real

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {}

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
