import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sweetalert2Component } from './sweetalert2/sweetalert2.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [Sweetalert2Component,PaginadorComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,    
    NgbModule
  ],
  entryComponents:[
    Sweetalert2Component,
    PaginadorComponent
  ],
  exports:[
    Sweetalert2Component,
    PaginadorComponent
  ]
})
export class ShareModule { }
