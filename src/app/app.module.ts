import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { HomeComponent } from './views//home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { S3ServiceService } from './services/s3-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LayoutsModule } from './components/common/layouts/layouts.module';
import { DataService } from './services/data.service';
import { HeaderComponent } from './header/header.component';
import { OrigenESComponent } from './views/origen-es/origen-es.component';
import { DestinoESComponent } from './views/destino-es/destino-es.component';
import { FichaEscolarComponent } from './views/ficha-escolar/ficha-escolar.component';
import { TdEvolucionMatriculaComponent } from './vis/td-evolucion-matricula/td-evolucion-matricula.component';
import { EvolucionMatriculaComponent } from './views/evolucion-matricula/evolucion-matricula.component';
import { TdOrigenEscolarComponent } from './vis/td-origen-escolar/td-origen-escolar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    OrigenESComponent,
    DestinoESComponent,
    FichaEscolarComponent,
    TdEvolucionMatriculaComponent,
    EvolucionMatriculaComponent,
    TdOrigenEscolarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutsModule
  ],
  providers: [
    AuthService,
    S3ServiceService,
    DataService,
    { provide: StorageBucket, useValue: 'educacion-ai.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
