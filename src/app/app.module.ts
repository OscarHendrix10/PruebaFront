import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { Routes, RouterModule } from '@angular/router';


//IMPLEMANTACION DE RUTAS ESTABLECIDAS ENE LE SISTEMA CON SU DEFAULT
const routes: Routes = [{
  path: "registro", component: RegistroComponent },
  {path: "mostrar", component: MostrarComponent},
  {path: "modificar/:id", component: ModificarComponent},
  {path: "**", component: RegistroComponent}];

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    MostrarComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
