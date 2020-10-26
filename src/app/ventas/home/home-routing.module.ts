import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PruebaComponent } from './prueba/prueba.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {
     path: '', component: HomeComponent, children: [
      { 
        path: 'usuarios',  component: UsuariosComponent 
      },
      { 
        path: 'prueba',  component: PruebaComponent 
      },
      {
        path: '', redirectTo: 'usuarios', pathMatch: 'full'
      },
      { 
        path: '**', component: UsuariosComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
