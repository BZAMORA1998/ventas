import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarUsusariosComponent } from './listar-ususarios/listar-ususarios.component';
import { ShareModule } from 'src/app/share/share.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PruebaComponent } from './prueba/prueba.component';



@NgModule({
  declarations: [CrearUsuarioComponent, ListarUsusariosComponent, PruebaComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule, 
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
    ImageCropperModule,
    NgxSkeletonLoaderModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
  ]
})
export class UsuariosModule { }
