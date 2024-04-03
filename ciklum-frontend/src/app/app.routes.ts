import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { PrincipalComponent } from './principal/principal.component';
import { Entrenamiento } from './entrenamientos/entrenamiento';
import { ContactoSesionComponent } from './detalles-sesion/contacto-sesion/contacto-sesion.component';
import { SesionesUsuarioComponent } from './sesiones-usuario/sesiones-usuario.component';
import { TablaInfoSesionComponent } from './detalles-sesion/tabla-info-sesion/tabla-info-sesion.component';
import { DetallesSesionComponent } from './detalles-sesion/detalles-sesion.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sesiones',
    component: SesionesUsuarioComponent
  },
  {
    path: 'detalle',
    component: DetallesSesionComponent
  },
  {
    path: 'contacto',
    component: ContactoSesionComponent
  },
  {
    path: 'tabla',
    component: TablaInfoSesionComponent
  },
  {
    path: 'entrenamiento',
    component: Entrenamiento
  },
  {
    path: 'forgotten-password',
    component: ForgottenPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'usuarios',
    component: ListadoUsuarioComponent
  },
  {
    path: 'principal',
    component: PrincipalComponent
  }
];
