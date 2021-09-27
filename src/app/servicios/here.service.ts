import { Injectable } from '@angular/core';
// DECLARACION DE LA VARIABLE HERE DEL MAPA
declare var H: any;

@Injectable({
    providedIn: 'root'
})
export class HereService {
    // VARIABLES UTILIZADAS PARA LA OBTENCION DEL MAPA HERE
    public platform: any;
    public platform2: any;
    public geocoder: any;
    public defaultLayers: any;
    public map: any;
    public latitude:number;
    public longitud:number;

// CONSTRUCTOR OBTENIENDO LAS API KEY DEL MAPA
    constructor() {
        this.platform = new H.service.Platform({
            "app_id": "GyIx5HZYfMaqo7y1wubc",
            "app_code": "wYk1bY-R4ESZDAJyR9_LCg"
        });
        this.geocoder = this.platform.getGeocodingService();
    }
//METODO PARA ENCONTRAR LAS CORDENADAS CON SOLO LA DIRECCION
    public getAddress(query: string) {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({ searchText: query }, result => {
                if (result.Response.View.length > 0) {
                    if (result.Response.View[0].Result.length > 0) {
                        resolve(result.Response.View[0].Result);
                    } else {
                        reject({ message: "no results found" });
                    }
                } else {
                    reject({ message: "no results found" });
                }
            }, error => {
                reject(error);
            });
        });
    }

    /**
       * Dibuja el mapa utilizando latitud y longitud
       * @param lat Latitud de la ubicacion
       * @param lng longitud de la ubicacion
       */
    public drawerMap(lat: number, lng: number): void {
        
        this.defaultLayers = this.platform.createDefaultLayers();

        console.log(this.platform.createDefaultLayers());
        let coords = null; //Coordenadas del click en el mapa
        let markerCl = null; //Marker del mapa

        const divMapCl = document.getElementById("map-container");
        console.log(lat);
        console.log(lng);
        console.log(divMapCl);
        divMapCl.innerHTML = "";
        this.map = null;
        /**
         * MARCADOR CON LAS COORDENADAS DEL PEDIDAS POR EL CLIENTE
         */
        markerCl = new H.map.Marker({ lat: lat, lng: lng });

        /**
         * Creacion del mapa
         */
        this.map = new H.Map(
            divMapCl,
            this.defaultLayers.normal.map,
            {
                zoom: 15,
                center: { lat: lat, lng: lng },
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        //Marker inicial
        this.map.addObject(markerCl);
    }

}
