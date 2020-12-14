import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { LoginComponent } from './login/login.component';
import { VentasComponent } from './ventas.component';


const routes: Routes = [
  {
     path: '', component: VentasComponent, children: [
      { 
        path: 'login',  component: LoginComponent 
      },
      { 
        path: 'crear-usuario',  component: CrearUsuarioComponent
      },
      {
        path: 'home',loadChildren:()=> import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      { path: '**', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
