import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { HomeComponent } from './home.component';
import { ModulosComponent } from './modulos/modulos.component';

const routes: Routes = [
  {
     path: '', component: HomeComponent, children: [
      { 
        path: 'seguridad',loadChildren:()=> import('./seguridad/seguridad.module').then(m => m.SeguridadModule)
      },
      { 
        path: 'modulos',  component: ModulosComponent,canActivate:[AuthGuard],data: {roles: ['MOD']}
      },
      {
        path: '', redirectTo: 'modulos',canActivate:[AuthGuard],data: {roles: ['MOD']}
      },
      { 
        path: '**', component: ModulosComponent,canActivate:[AuthGuard],data: {roles: ['MOD']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
