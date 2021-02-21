import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { HomeComponent } from './home.component';
import { ModulosComponent } from './modulos/modulos.component';

const routes: Routes = [
  {
     path: '', component: HomeComponent, children: [
      { 
        path: 'usuarios',loadChildren:()=> import('./usuarios/usuarios.module').then(m => m.UsuariosModule),canActivate:[AuthGuard]
      },
      { 
        path: 'modulos',  component: ModulosComponent ,canActivate:[AuthGuard]
      },
      {
        path: '', redirectTo: 'modulos', pathMatch: 'full',canActivate:[AuthGuard]
      },
      { 
        path: '**', component: ModulosComponent ,canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
