import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuariosComponent, RolesComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SeguridadModule { }
