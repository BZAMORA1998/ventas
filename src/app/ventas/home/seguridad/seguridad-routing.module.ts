import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { SeguridadComponent } from './seguridad.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {
     path: '', component: SeguridadComponent, children: [
      { 
          path: 'usuarios',loadChildren:()=> import('./usuarios/usuarios.module').then(m => m.UsuariosModule),canActivate:[AuthGuard],data: {roles: ['SEG']}
      },
      {
        path: '', redirectTo: 'usuarios', pathMatch: 'full',canActivate:[AuthGuard],data: {roles: ['SEG']}
      },
      { 
        path: '**', component: UsuariosComponent ,canActivate:[AuthGuard],data: {roles: ['SEG']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
