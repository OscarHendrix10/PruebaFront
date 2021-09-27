import { Component , OnInit } from '@angular/core';
import { Conductores } from '../../conductores.model';
import { ConsultasService } from '../../servicios/consultas.service';
import Swal from 'sweetalert2';
import { HereService } from '../../servicios/here.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  title = "Resgristro Conductor";
  
  //VARIABLES PUBLICAS PARA EL CONSUMO DEL MAPA
  public query: string;
  public position: string;
  public locations: Array<any>;
  
  conductor:Conductores = new Conductores;

  constructor(private consultaService:ConsultasService,private here: HereService, private route:Router) {
    //CORDENADAS DE PRUEBA PARA LA OBTENCION DE LOS DATOS DE LOCALIZACION EN UN ARRAY 
    this.query = "Leon GTO";
    this.position = "21.12377,-101.68214";
  }
// METODO PARA OBTENER LA UBICACION MEDIANTE LA DIRECCION INDICADA POR EL USUARIO
  public getAddress() {
    //BUSACMOS LA DIRECCION DEL CONDUCTOR 
    if(this.conductor.ubicacion != "") {
        this.here.getAddress(this.conductor.ubicacion).then(result => {
          //GUARDAMOS LA VARIABLE LOCATION EN EL ARRAY RESULT 
          this.locations = <Array<any>>result;
          //ITERAMOS LA VARIABLE DE LOCATIONS PARA SACAR LOS VALORES QUE NOS INTERESAN
            for (let index = 0; index < this.locations.length; index++) {
              const element = this.locations[index];
            }
            // ENCONTAMOS LOS VALOES 
            const element = this.locations.pop();
            // IMPLEMENTACION DEL MAPA UTILIZANDO EL ELEMENT
            this.here.drawerMap(element.Location.DisplayPosition.Latitude, element.Location.DisplayPosition.Longitude);
            
        }, error => {
            console.error(error);
        });
    }
}

  // REGISTRO DEL CONDUCTOR CON LOS CAMPOS ESTABLECIDOS EN LA BD
  registrar(){
    Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso',
      text: 'Conductor Registrado Correctamente',
      footer: '<a [routerLink]="["/mostrar"]">Ver Conductores</a>'
    });
    this.consultaService.agregarCondructores(this.conductor).subscribe( (rest) => {
      console.log(rest);
      this.conductor = new Conductores();
      
  },
  (error) =>{
    console.log(error);
  });
  
  }
// MAPA INCIANDO EN LA UBICACION LEON GTO 
  ngOnInit(): void {
    this.here.drawerMap(21.12377,-101.68214);
  }
  


  
}
