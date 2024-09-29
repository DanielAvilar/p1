import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RestablecerComponent } from './restablecer/restablecer.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QrlistaComponent } from './qrlista/qrlista.component';
import { InicioAlumnoComponent } from './inicio-alumno/inicio-alumno.component';
import { CamaraComponent } from './camara/camara.component';

@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
    RestablecerComponent,
    QrlistaComponent,
    InicioAlumnoComponent,
    CamaraComponent

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    IonicModule,
    FormsModule
  ]
})
export class PagesModule { }
