import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sweetalert2Component } from './sweetalert2/sweetalert2.component';


@NgModule({
  declarations: [Sweetalert2Component],
  imports: [
    CommonModule
  ],
  entryComponents:[
    Sweetalert2Component
  ],
  exports:[
    Sweetalert2Component
  ]
})
export class ShareModule { }
