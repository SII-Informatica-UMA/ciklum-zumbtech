import { Injectable } from '@angular/core';
import {Usuario } from '../entities/usuario';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private baseURI: string = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  /*getContactos(): Observable<Usuario []> {
    return this.http.get<Usuario []>(this.baseURI);
  }*/

  addContacto(contacto: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURI, contacto);
  }

  /*editarContacto(contacto: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.baseURI + '/' + contacto.id, contacto);
  }

  eliminarcContacto(id: number): Observable<HttpResponse<string>> {
    return this.http.delete(this.baseURI + '/' + id, {observe: "response", responseType: 'text'});
  }*/
}