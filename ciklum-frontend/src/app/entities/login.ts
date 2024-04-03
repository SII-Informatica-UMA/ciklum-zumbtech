
export interface Login {
  email: string;
  password: string;
}

export interface JwtResponse {
  jwt: string;
}

export enum Rol {
  ADMINISTRADOR = 'administrador',
  GERENTE = 'gerente',
  ENTRENADOR = 'entrenador',
  CLIENTE = 'cliente'
}

export interface RolCentro {
  rol: Rol;
  centro?: number;
  nombreCentro?: string;
}

export interface UsuarioSesion {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  jwt: string;
  roles: RolCentro[];
}

export type MapaCentros = Map<number, string>;


