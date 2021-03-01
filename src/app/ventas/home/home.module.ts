import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModulosComponent } from './modulos/modulos.component';
import { SeguridadComponent } from './seguridad/seguridad.component';


@NgModule({
  declarations: [ModulosComponent,SeguridadComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
    MatTooltipModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,    
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatTabsModule,
    MatInputModule ,
    FormsModule,
    NgxSkeletonLoaderModule.forRoot()
  ]
})
export class HomeModule { }
