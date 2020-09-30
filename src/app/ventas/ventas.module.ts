import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ShareModule
  ]
})
export class VentasModule { }
