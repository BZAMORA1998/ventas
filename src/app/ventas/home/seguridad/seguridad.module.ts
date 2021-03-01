import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }
