import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { EditarComponent } from './pages/editar/editar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { ModificarComponent } from './pages/modificar/modificar.component';

//IMPLEMANTACION DE RUTAS ESTABLECIDAS ENE LE SISTEMA CON SU DEFAULT
const routes: Routes = [{
  path: "registro", component: RegistroComponent 
},{
  path: "editar", component: EditarComponent
},{path: "mostrar", component: MostrarComponent
},{
  path: "modificar/:id", component: ModificarComponent
},
{
  path: "**", component: RegistroComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
