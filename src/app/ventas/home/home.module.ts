import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { PruebaComponent } from './prueba/prueba.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [PruebaComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule
  ]
})
export class HomeModule { }
