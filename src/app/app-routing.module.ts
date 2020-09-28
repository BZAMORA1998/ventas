import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'ventas' , loadChildren:()=> import('./ventas/ventas.component').then(m => m.VentasComponent)
  // },
  // { 
  //     path: '**', redirectTo: 'ventas' 
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
