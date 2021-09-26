//IMPORTACIONES DE ENV Y HTTP CLIENT
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductores } from '../conductores.model';
// CLASE DE TIPO SERVICE PARA LAS ACCIONES DEL RESPUESTA DEL BACK AL FRONT
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private _http: HttpClient) { }
// CONSULTA DE OPERACIONES BASICAS DE LA BASE DE DATOS TANTO COMO 

//COSNULTA HTTP DE CONSULTA
  cosnultarConductores():Observable<Conductores[]>{
    return this._http.get<Conductores[]>(`${environment.Url}/consultar`);
  }
  
  agregarCondructores(conductor:Conductores):Observable<Conductores>{
  
    return this._http.post<Conductores>(`${environment.Url}/agregar`, conductor);
  }
//COSNULTA HTTP DE ELIMINACION
  eliminarConductor(idConductor:number):Observable<Conductores>{

    return this._http.delete<Conductores>(`${environment.Url}/eliminar/${idConductor}`);
  
  }
//COSNULTA HTTP DE CONSULTA
  buscarConductor(idConductor:number):Observable<Conductores>{

    return this._http.get<Conductores>(`${environment.Url}/buscar/${idConductor}`);
  
  }
//COSNULTA HTTP MODIFICACION
  modificaCondructores(conductor:Conductores, idConductor:number):Observable<Conductores>{
  
    return this._http.put<Conductores>(`${environment.Url}/editar/${idConductor}`, conductor);
  }
}
