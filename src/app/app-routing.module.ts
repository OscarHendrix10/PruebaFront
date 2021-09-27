import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { ModificarComponent } from './pages/modificar/modificar.component';

//IMPLEMANTACION DE RUTAS ESTABLECIDAS ENE LE SISTEMA CON SU DEFAULT
// const routes: Routes = [{
//   path: "registro", component: RegistroComponent },
//   {path: "mostrar", component: MostrarComponent},
//   {path: "modificar/:id", component: ModificarComponent},
//   {path: "**", component: RegistroComponent}];

@NgModule({
  imports: [],
  exports: []
})
export class AppRoutingModule { }
