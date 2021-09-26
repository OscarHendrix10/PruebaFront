import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { Conductores } from '../../conductores.model';
import { ConsultasService } from '../../servicios/consultas.service';
import { HereService } from '../../servicios/here.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  title = "Modificacion de conductores"
 
  public platform: any;
  public geocoder: any;

  //VARIABLES PUBLICAS PARA EL CONSUMO DEL MAPA
  public query: string;
  public position: string;
  public locations: Array<any>;

  conductores:Conductores = new Conductores;
  
  constructor(private activateRoute: ActivatedRoute,private router: Router, private miServicio:ConsultasService, private here: HereService) { }
  
  ngOnInit(): void {
    // detectamos el perametro que se encuentra en la url 
    // pipe es un filter de xjs  
    // tap detecta la activacion de un observable y ejecuta codigo en momento
    this.activateRoute.params.pipe(
      switchMap(({id}) => this.miServicio.buscarConductor(id))).subscribe((rest) => {
      this.conductores = rest;
    },(error) => {
      console.log(error);
    });
  }
// METODO PARA OBTENER LA UBICACION MEDIANTE LA DIRECCION INDICADA POR EL USUARIO
  public getAddress() {
     //BUSACMOS LA DIRECCION DEL CONDUCTOR 
    if(this.conductores.ubicacion != "") {
        this.here.getAddress(this.conductores.ubicacion).then(result => {
          //GUARDAMOS LA VARIABLE LOCATION EN EL ARRAY RESULT
            this.locations = <Array<any>>result;
            //ITERAMOS LA VARIABLE DE LOCATIONS PARA SACAR LOS VALORES QUE NOS INTERESAN
            for (let index = 0; index < this.locations.length; index++) {
              const element = this.locations[index];
              //console.log(element.Location.DisplayPosition.Latitude)
              //console.log(element.Location.DisplayPosition.Longitude)
            }
             // ENCONTAMOS LOS VALOES 
            const element = this.locations.pop();
            // IMPLEMENTACION DEL MAPA UTILIZANDO EL ELEMENTO
            this.here.drawerMap(element.Location.DisplayPosition.Latitude, element.Location.DisplayPosition.Longitude);
            
        }, error => {
            console.error(error);
        });
    }
}

// MODIFICACION DEL CONDUCTOR CON LOS CAMPOS ESTABLECIDOS EN LA BD
  modificarConductor(){
   this.miServicio.modificaCondructores(this.conductores, this.conductores.idConductor).subscribe( 
     (rest) => {
      Swal.fire({
        icon: 'success',
        title: 'Modificacion Exitoso',
        text: 'Conductor Modificado Correctamente',
        footer: '<a href="/mostrar">Ver Conductores</a>'
      });
      this.conductores = new Conductores();
     },(error) => {
      Swal.fire({
        icon: 'error',
        title: 'Registro Fallido',
        text: 'Conductor no se Registro Correctamente'
      });
     });
  }

}
