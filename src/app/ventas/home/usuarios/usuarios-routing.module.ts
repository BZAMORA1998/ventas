import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListarUsusariosComponent } from './listar-ususarios/listar-ususarios.component';
import { PruebaComponent } from './prueba/prueba.component';
import { UsuariosComponent } from './usuarios.component';


const routes: Routes = [
  {
     path: '', component: UsuariosComponent, children: [
      { 
        path: 'crear-usuario',  component: CrearUsuarioComponent 
      },
      { 
        path: 'listar-usuarios',  component: ListarUsusariosComponent 
      },
      { 
        path: 'prueba',  component: PruebaComponent 
      },
      {
        path: '', redirectTo: 'listar-usuarios', pathMatch: 'full'
      },
      { 
        path: '**', component: ListarUsusariosComponent 
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
