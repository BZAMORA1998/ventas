import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MaterialDesignComponent } from './material-design/material-design.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {
     path: '', component: HomeComponent, children: [
      { 
        path: 'usuarios',  component: UsuariosComponent 
      },
      { 
        path: 'material-design',  component: MaterialDesignComponent 
      },
      {
        path: '', redirectTo: 'material-design', pathMatch: 'full'
      },
      { 
        path: '**', component: MaterialDesignComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
