import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RestablecerComponent } from './restablecer/restablecer.component';
import { QrlistaComponent } from './qrlista/qrlista.component';
import { InicioAlumnoComponent } from './inicio-alumno/inicio-alumno.component';
import { CamaraComponent } from './camara/camara.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'restablecer', component: RestablecerComponent},
  {path: 'qrlista', component: QrlistaComponent},
  {path: 'inicio-alumno', component: InicioAlumnoComponent},
  {path: 'camara', component: CamaraComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
