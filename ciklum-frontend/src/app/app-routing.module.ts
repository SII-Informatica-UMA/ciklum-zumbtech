import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';

const routes: Routes = [{path: 'forgotten-password',
component: ForgottenPasswordComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
