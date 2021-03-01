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
        path: 'crear-usuario',  component: CrearUsuarioComponent, canActivate:[AuthGuard]
      },
      { 
        path: 'listar-usuarios',  component: ListarUsusariosComponent ,canActivate:[AuthGuard]
      },
      { 
        path: 'prueba',  component: PruebaComponent,canActivate:[AuthGuard] 
      },
      {
        path: '', redirectTo: 'listar-usuarios', pathMatch: 'full',canActivate:[AuthGuard]
      },
      { 
        path: '**', component: ListarUsusariosComponent ,canActivate:[AuthGuard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
