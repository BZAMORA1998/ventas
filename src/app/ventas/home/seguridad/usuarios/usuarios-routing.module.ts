import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListarUsusariosComponent } from './listar-ususarios/listar-ususarios.component';
import { PruebaComponent } from './prueba/prueba.component';
import { UsuariosComponent } from './usuarios.component';


const routes: Routes = [
  {
     path: '', component: UsuariosComponent, children: [
      { 
        path: 'crear-usuario',  component: CrearUsuarioComponent, canActivate:[AuthGuard],data: {roles: ['SEG']}
      },
      { 
        path: 'listar-usuarios',  component: ListarUsusariosComponent ,canActivate:[AuthGuard],data: {roles: ['SEG']}
      },
      { 
        path: 'prueba',  component: PruebaComponent,canActivate:[AuthGuard],data: {roles: ['SEG']}
      },
      {
        path: '', redirectTo: 'listar-usuarios', pathMatch: 'full',canActivate:[AuthGuard],data: {roles: ['SEG']}
      },
      { 
        path: '**', component: ListarUsusariosComponent ,canActivate:[AuthGuard],data: {roles: ['SEG']}
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
