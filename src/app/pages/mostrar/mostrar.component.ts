import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/servicios/consultas.service';
import { Conductores } from '../../conductores.model';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {

  title = "Conductores";
  // DECLARACION DE VARIABLES Y CONDICIONES
  public boton = false;
  conductores: Conductores[] = [];
  buscarConductor: string;

  //DOCUMENTO PDF
  private date: Date;
  private ws: XLSX.WorkSheet; //WorkSheet
  private wb: XLSX.WorkBook; //WorkBook
// DECLARACION DE CLASES EN EL CONTRUCTOR
  constructor(private consultaService: ConsultasService) { this.date = new Date; }

  // INICIANDO EL METODO POR DEFAULT
  ngOnInit(): void {
    this.actualizarDatos();

  }
// METODO QUE RECIBE A TODOS LOS CONDUCTORES EN LA TABALA DEL MOSTRAR.HTML 
  actualizarDatos() {
    this.consultaService.cosnultarConductores().subscribe((rest) => {
      this.conductores = rest;
    },
      (error) => {
        console.log(error);
      });

  }
  // ELIMINACION DE UN CONDUCTOR EN LA TABLA DEL MOSTRAR.HTM PASANDO COMO PARAMETRO EL
  // ID DEL CONSTRUCTOR
  eliminar(idConductor: number) {
    Swal.fire('Eliminacion exitosa...', 'El registro fue eliminado', 'success');
    this.consultaService.eliminarConductor(idConductor).subscribe((rest) => {
    },
      (error) => {
        console.log(error);
        this.actualizarDatos();
      });
      this.actualizarDatos();
  }

  // BUSCADOR EN UN MENU DESPEGRABLE EN LA TABLA 
  buscarinTable(buscarConductor) {
    if (this.conductores.filter(x => x.nombreCompleto == buscarConductor)) {
      // APARICION DEL BOTON EN LA TABLA
      this.boton = !this.boton;
      // LO ENCONTRADO LO GUARDAMOS EN UNA VARIABLE
      let seachConductor = this.conductores.filter(x => x.nombreCompleto == buscarConductor);
      // VACIAMOS CONDUCTORES 
      this.conductores = [];
      // LO INSERTAMOS 
      this.conductores = seachConductor;
    } else {
      this.actualizarDatos();
    }
  }

  // METODO PARA GENERAR EL Ecxel 
  generarExcel(): void {
    const nombreXLSX = this.date.toDateString() +
      '-' + this.date.getHours() +
      '-' + this.date.getMinutes() +
      '-' + this.date.getSeconds() +
      '-' + this.date.getMilliseconds();
    this.ws = XLSX.utils.json_to_sheet(this.conductores);
    this.wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(this.wb, this.ws, 'Conductores');
    XLSX.writeFile(this.wb, `${nombreXLSX}'-Tabla_Datos_Conductores.xlsx`);
  }
// GENERAR LA IMPORTACION DE LOS DATOS EN PDF 
  generarPdf(): void {
    const doc = new jsPDF()
    autoTable(doc, { html: '#xd' })
    doc.save('TablaDeConductores.pdf')
  }
// REFRECA LOS DATOS DE BUSCAR EN LA TABLA
  refrescar() {
    this.boton = !this.boton;
    this.actualizarDatos();
  }

}
