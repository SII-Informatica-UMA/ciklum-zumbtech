import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Usuario } from "../entities/usuario";
import { SECRET_JWT } from "../config/config";
import { from } from "rxjs";
import * as jose from 'jose';
import { FRONTEND_URI } from "../config/config";
import { Rutina, Sesion, entrenadorCliente } from "../entities/sesion";
import { Plan } from "../entities/sesion";

// Este servicio imita al backend pero utiliza localStorage para almacenar los datos

const usuariosC: Usuario [] = [
  {
    id: 1,
    nombre: 'Admin',
    apellido1: 'Admin',
    apellido2: 'Admin',
    email: 'admin@uma.es',
    administrador: true,
    password: 'admin'
  },
  {
    id: 2,
    nombre: 'Antonio',
    apellido1: 'García',
    apellido2: 'Ramos',
    email: 'antonio@uma.es',
    administrador: false,
    password: '5678'
  },
];


const Sesiones: Sesion[] = [
    {
      idPlan: 0,
      inicio: new Date(),
      fin: new Date(),
      trabajoRealizado: "jugué a las palas en la playa",
      multimedia: ["https://www.youtube.com/shorts/-Tj9Ka6CEJw", "https://www.youtube.com/watch?v=xrUVWk5shXo"],
      decripcion: "soy muy malo y enano",
      presencial: true,
      datosSalud: ["tengo asma"],
      id: 0
    },
    {
      idPlan: 0,
      inicio: new Date(),
      fin: new Date(),
      trabajoRealizado: "dominó con papi",
      multimedia: ["https://www.youtube.com/watch?v=xrUVWk5shXo"],
      decripcion: "hamuc",
      presencial: true,
      datosSalud: ["ujaja"],
      id: 1
    },
    {
      idPlan: 1,
      inicio: new Date(),
      fin: new Date(),
      trabajoRealizado: "haciendo press de banca con 500kg",
      multimedia: ["https://www.youtube.com/watch?v=iu5G37fyyAg"],
      decripcion: "trembo",
      presencial: true,
      datosSalud: ["zoyfuerte"],
      id: 0
    },
  ]

  const Planes: Plan[] = [ 
    {
      planId: 0,
      userId: 1,
      sesiones: [Sesiones[0], Sesiones[1]]
    }, 
    {
      planId: 1,
      userId: 2,
      sesiones: [Sesiones[2]]
    }
  ]
  

@Injectable({
  providedIn: 'root'
})
export class BackendFakeService {
  private usuarios: Usuario [];
  private forgottenPasswordTokens;
  private planes: Plan[];

  constructor() {
    this.usuarios = [...usuariosC];
    this.forgottenPasswordTokens = new Map();
    this.planes = [...Planes];
    localStorage.clear();
    this.actualizarLocalStorage();
  }

  actualizarLocalStorage() {
    this.guardarForgottenPasswordTokensEnLocalStorage();
    this.guardarPlanesEnLocalStorage();
    this.guardarUsuariosEnLocalStorage();
  }

  getUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }

  getPlanes(idE: number | undefined): Observable<Plan[]> {
    const planesUser: Plan[] = [];
    // Iterar sobre cada plan
    for (const plan of this.planes) {
      if(plan.userId === idE) {
        planesUser.push(plan);
      }
    }
    return of(planesUser);
  }

  getSesiones(idPlan: Number): Observable<Sesion[]> {
    let aux: Sesion[] = [];
    for(const plan of this.planes) {
      if(plan.planId === idPlan) {
        aux = plan.sesiones;
      }
    }
    return of(aux);
  }

  postPlan(fInicio: Date, fFinal: Date, rRecurrencia: string, idE: number | undefined): Observable<Rutina> {
    this.planes.push({
      planId: this.númeroPlanesUser(idE),
      userId: idE,
      sesiones: []
    },);
    this.guardarPlanesEnLocalStorage();
    const rutinaRes: Rutina = {
      fechaInicio: fInicio,
      fechaFin: fFinal,
      reglaRecurrencia: rRecurrencia,
      idRutina: idE,
      id: this.planes.length
    };
    return of(rutinaRes);
  }

  númeroPlanesUser(id: number | undefined): number {
    let res = 0;
    for (const plan of this.planes) {
      if (plan.userId === id) {
          if(plan.planId.valueOf() > res) {
            res = plan.planId.valueOf() + 1;
          }
          else {
            ++res;
          }
      }
    }
    return res;
  }

  numeroSesionUser(sesiones: Sesion[]): number {
    let res = 0;
    for(let i = 0; i < sesiones.length; ++i) {
      if(sesiones[i].id.valueOf() > res) {
        res = sesiones[i].id.valueOf() + 1;
      }
      else {
        ++res;
      }
    }
    return res;
  }

  postSesion(sesion: Sesion, idPlan: Number): Observable<Plan> {
    let aux: Plan = {planId: 0, userId: 0, sesiones: []};
    for (const plan of this.planes) {
      if (plan.planId === idPlan) {
          aux = plan;
          sesion.id = this.numeroSesionUser(aux.sesiones);
          sesion.idPlan = idPlan;
          plan.sesiones.push(sesion);
      }
    }
    this.guardarPlanesEnLocalStorage();
    return of(aux);
  }

  getSesionesPlan(idPlan: Number): Observable<Sesion[]> {
    const sesionesEnPlanes1: Sesion[] = [];

    // Iterar sobre cada plan
    for (const plan of this.planes) {
        // Verificar si el plan tiene el idPlan deseado
        if (plan.sesiones && plan.sesiones.length > 0 && plan.sesiones[0].idPlan === idPlan) {
            // Agregar las sesiones de este plan al arreglo de sesiones si coincide con el idPlan deseado
            sesionesEnPlanes1.push(...plan.sesiones);
        }
    }

    return of(sesionesEnPlanes1);

  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    let u = this.usuarios.find(u => u.email == usuario.email);
    if (!usuario.email) {
      return new Observable<Usuario>(observer => {
        observer.error('El email es obligatorio');
      });
    }
    if (u) {
      return new Observable<Usuario>(observer => {
        observer.error('El usuario ya existe');
      });
    }
    // Si no trae contraseña generamos una aleatoria
    if (usuario.password.length == 0) {
      usuario.password = this.generarCadena();
    }

    usuario.id = this.usuarios.map(u => u.id).reduce((a, b) => Math.max(a, b)) + 1;
    this.usuarios.push(usuario);
    this.guardarUsuariosEnLocalStorage();
    return of(usuario);
  }

  private guardarUsuariosEnLocalStorage() {
    localStorage.removeItem('usuarios');
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  private guardarPlanesEnLocalStorage() {
    localStorage.removeItem('planes');
    localStorage.setItem('planes', JSON.stringify(this.planes));
  }

  private guardarForgottenPasswordTokensEnLocalStorage() {
    localStorage.removeItem('forgottenPasswordTokens');
    localStorage.setItem('forgottenPasswordTokens', JSON.stringify(Array.from(this.forgottenPasswordTokens.entries())));
  }

  deletePlan(idP: number) {
    for (let i = 0; i < this.planes.length; ++i) {
      // Verificar si el plan tiene el idPlan deseado
      if (this.planes[i].planId === idP) {
          // Agregar las sesiones de este plan al arreglo de sesiones si coincide con el idPlan deseado
          this.planes.splice(i, 1);
      }
    }
    this.guardarPlanesEnLocalStorage();
  }

  deleteSesion(idP: Number, idSesion: Number) {
    let aux: Sesion[] = [];
    for(const plan of this.planes) {
      if(plan.planId === idP) {
        for(let i = 0; i < plan.sesiones.length; ++i) {
          if(plan.sesiones[i].id === idSesion) {
            plan.sesiones.splice(i,1);
          }
        }
      }
    }
    this.guardarPlanesEnLocalStorage();
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    let u = this.usuarios.find(u => u.id == usuario.id);
    if (!u) {
      return new Observable<Usuario>(observer => {
        observer.error('El usuario no existe');
      });
    }
    // Si la contraseña está en blanco mantenemos la que ya tiene
    if (usuario.password.length == 0) {
      usuario.password = u.password;
    }

    Object.assign(u, usuario);
    this.guardarUsuariosEnLocalStorage();
    return of(u);
  }

  deleteUsuario(id: number): Observable<void> {
    let i = this.usuarios.findIndex(u => u.id == id);
    if (i < 0) {
      return new Observable<void>(observer => {
        observer.error('El usuario no existe');
      });
    }
    for(const plan of this.planes) {
      if(plan.userId === id) {
        this.deletePlan(plan.planId.valueOf());
      }
    }
    this.usuarios.splice(i, 1);

    this.guardarUsuariosEnLocalStorage();
    return of();
  }

  getUsuario(id: number): Observable<Usuario> {
    let u = this.usuarios.find(u => u.id == id);
    if (!u) {
      return new Observable<Usuario>(observer => {
        observer.error('El usuario no existe');
      });
    }
    return of(u);
  }

  login(email: string, password: string): Observable<string> {
    let u = this.usuarios.find(u => u.email == email && u.password == password);
    if (!u) {
      return new Observable<string>(observer => {
        observer.error({status: 401, statusText: 'Usuario o contraseña incorrectos'});
      });
    }
    return from(this.generateJwt(u));
  }

  forgottenPassword(email: string): Observable<void> {
    const token = this.generarCadena()
    console.log('Para resetar la contraseña acceda a: '+FRONTEND_URI+'/reset-password?token='+token);
    this.forgottenPasswordTokens.set(token, email);
    this.guardarForgottenPasswordTokensEnLocalStorage();
    return of();
  }

  resetPassword(token: string, password: string): Observable<void> {
    if (!this.forgottenPasswordTokens.get(token)) {
      return new Observable<void>(observer => {
        observer.error('Token incorrecto');
      });
    }
    let email = this.forgottenPasswordTokens.get(token);
    console.log("Email for token: ", email)
    let u = this.usuarios.find(u => u.email == email);
    if (!u) {
      return new Observable<void>(observer => {
        observer.error('Usuario no existe');
      });
    }
    u.password = password;
    this.forgottenPasswordTokens.delete(token);
    this.actualizarLocalStorage();
    return of();
  }

  private generateJwt(usuario: Usuario): Promise<string> {
    const secret = new TextEncoder().encode(SECRET_JWT);
    return new jose.SignJWT({ sub: ""+usuario.id, email: usuario.email })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);
  }

  private generarCadena(): string {
    return Math.random().toString(36).substring(2);
  }

}
