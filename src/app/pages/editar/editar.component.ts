import { Component, OnInit } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  title = "Editar Conductor";

  //Mapa
  private platform: any;
  private map: any;
  private defaultLayers: any;
  public longitud: number;
  public latitude: number;


  constructor(){
    this.platform = new H.service.Platform({
      "apikey": "zpv4wvrky2xfZcmDrAUCPP1q2uA108hJPFuSxO8zOO4"
    });
  }
  ngOnInit(): void {
    this.drawerMap(21.11177,-101.69838);
  }
 /**
   * Obtiene la localizacion del usuario
   */
  getLocationUser(): void {

    const config = {
      enableHighAccuracy: true,
      maximumAge: Infinity,
      timeout: Infinity
    };

    //Verifica si el navegador es compatible con la geolocalizacion
    if ('geolocation' in navigator) {
      
      /*
      Se obtiene la posicion del usuario, el metodo .getCurrentPosition()
      resibe como parametros, un succes callback para obtener las cordenadas,
      un error callback en caso de ocurrir algun error con la localizacion.
      */
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          this.longitud = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.drawerMap(this.latitude, this.longitud);
        }, () => {}, config)
    }
  }

  /**
   * Dibuja el mapa utilizando latitud y longitud
   * @param lat Latitud de la ubicacion
   * @param lng longitud de la ubicacion
   */
  drawerMap(lat: number, lng: number): void {

    let coords = null; //Coordenadas del click en el mapa
    let markerCl = null; //Marker del mapa

    this.defaultLayers = this.platform.createDefaultLayers();

    const divMapCl = document.getElementById("map-container");
    divMapCl.innerHTML = "";
    /**
     * Markador con las cordenadas del cliente.
     */
    markerCl = new H.map.Marker({ lat: lat, lng: lng});

    /**
     * Creacion del mapa
     */
    this.map = new H.Map(
      divMapCl,
      this.defaultLayers.vector.normal.map,
      {
        zoom: 15,
        center: { lat: lat, lng: lng },
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    //Marker inicial
    this.map.addObject(markerCl);

    /**
     * Evento para obtener las coodenadas 'clicleadas' en el mapa para modificar las
     * coordenadas y la pocicios del Marker en el mapa
     */
    this.map.addEventListener('tap', (evt) => {
      coords = this.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      console.log(coords);
      this.map.removeObject(markerCl);

      markerCl = new H.map.Marker({ lat: coords.lat, lng: coords.lng});
      this.map.addObject(markerCl);

      this.longitud = coords.lng;
      this.latitude = coords.lat;
    });

    window.addEventListener('resize', () => this.map.getViewPort().resize());
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))

    let ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }
}
