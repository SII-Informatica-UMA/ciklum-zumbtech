export class UsuarioD {
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
  
    constructor(nombre: string, apellido: string, edad: number, email: string) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.email = email;
    }
  }
  
  // Crear una instancia del usuario dummy
  export const usuarioDummy: UsuarioD = new UsuarioD("Ivan", "Iroslavov", 20, "ivaniroslavov@uma.es");
  