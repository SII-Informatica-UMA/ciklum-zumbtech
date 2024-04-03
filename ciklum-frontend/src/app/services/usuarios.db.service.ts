import {UsuarioSesion, Rol, MapaCentros} from '../entities/login';

export const usuarios: UsuarioSesion [] = [
  {
    id: 1,
    nombre: 'J. Francisco',
    apellido1: 'Chicano',
    apellido2: 'García',
    email: 'chicano@uma.es',
    jwt: 'eyJhbGci',
    roles: [
      {rol: Rol.ADMINISTRADOR},
      {rol: Rol.GERENTE, centro: 1, nombreCentro: 'Málaga'},
      {rol: Rol.GERENTE, centro: 2, nombreCentro: 'Cádiz'},
    ]
  }
]

export const passwords: Map<string, string> = new Map([
  ['chicano@uma.es', '1234'],
]);
