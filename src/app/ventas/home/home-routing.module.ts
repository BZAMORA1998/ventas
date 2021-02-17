import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ModulosComponent } from './modulos/modulos.component';

const routes: Routes = [
  {
     path: '', component: HomeComponent, children: [
      { 
        path: 'usuarios',loadChildren:()=> import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      { 
        path: 'modulos',  component: ModulosComponent 
      },
      {
        path: '', redirectTo: 'modulos', pathMatch: 'full'
      },
      { 
        path: '**', component: ModulosComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
