import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { basicComponent } from './components/common/layouts/basic.component';
import { blankComponent } from './components/common/layouts/blank.component';
import { DestinoESComponent } from './views/destino-es/destino-es.component';
import { OrigenESComponent } from './views/origen-es/origen-es.component';
import { FichaEscolarComponent } from './views/ficha-escolar/ficha-escolar.component';
import { EvolucionMatriculaComponent } from './views/evolucion-matricula/evolucion-matricula.component';
import {DesercionEsComponent} from './views/desercion-es/desercion-es.component';
const routes: Routes = [
  // Main redirect
  {path: '', redirectTo: 'carrera/evolucion-matricula', pathMatch: 'full'},

  // App views
  {
    path: 'carrera', component: basicComponent,
    children: [
      {path: 'evolucion-matricula', component: EvolucionMatriculaComponent},
      {path: 'origen-ed-sup', component: OrigenESComponent},
      {path: 'origen-escolar', component: HomeComponent},
      {path: 'destino-ed-sup', component: DestinoESComponent},
      {path: 'desercion-ed-sup', component: DesercionEsComponent}
    ]
  },

  {
    path: 'login', component: basicComponent,
    children: [
      {path: '', component: LoginComponent},
    ]
  },
  //{ path: 'main', component: MainComponent },
  //{ path: 'home', component: HomeComponent },
  //{ path: 'login', component: LoginComponent },
  //{ path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
