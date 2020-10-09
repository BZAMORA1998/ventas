import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';


@NgModule({
  declarations: [LoginComponent, CrearUsuarioComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ShareModule
  ]
})
export class VentasModule { }
