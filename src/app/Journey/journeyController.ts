import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

//Import für Mapbox
import * as Mapboxgl from 'mapbox-gl'

import { MapboxServiceService, Feature } from './Services/mapbox-service.service';

import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';

import { HttpClient } from '@angular/common/http';

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { AlertController } from '@ionic/angular';

import { TaxiService } from '../TaxiCompany/TaxiUnternehmen/Services/taxi.service'; 
import { JourneyService } from './Services/journey.service';
import { TaxirouteService } from '../TaxiCompany/TaxiManagement/Services/taxiroute.service';
import { AuthService } from '../Login_new/services/auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';




@Component({
  selector: 'app-Journey',
  templateUrl: 'journeyView.html',
  styleUrls: ['journey.scss']
})



export class JourneyPage {

  selectedKey: any;
  smallestValue: any;

  //Koordinaten
  public latitude: number;
  public longitude: number;
  public map: Mapboxgl.Map;
  Taxis: any = [];
  dateFormat: any;
  

  constructor(
    private mapboxService: MapboxServiceService,
    private geolocation: Geolocation,
    private http: HttpClient,
    private taxiService: TaxiService,
    private journeyService: JourneyService,
    private taxiRouteService: TaxirouteService,
    private alertController: AlertController,
    private authService: AuthService,
    ) {

      this.currentUser = this.authService.user;

    }
  
    addresses: string[] = [];
    selectedAddress = null;
    geocoderstart: any;
    geocoderziel: any;  
    startType= "";
    
    latSearch: any;
    lngSearch: any;
    
    //journey
    journey: any;
    startPoint:string ="";
    endPoint:string ="";
    date: String ="";
    time: String ="";
    numberOfPersons: number;
  
    //route
    route: any;
    price: number;
    routeDistance: number;
    routeDuration: number;
    

    //Payment
    paymentType: string="";

    completeDistance: number;
    entfernung = {};

    //User
    currentUser: any;

    test: string="";

    //Button nur 1x klicken
    disableButton;
    
  ngOnInit() {
    
    this.taxiService.getTaxiList().subscribe((res) => {
      this.Taxis = res;
    });

    var geoOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
		  maximumAge: 0
    }
    this.geolocation.getCurrentPosition(geoOptions).then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });

     
    
    //https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=
    
  }

  public sendGetRequest(){  
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +this.longitude+"," + this.latitude + ".json?language=de&access_token=" +environment.mapboxKey;
    this.http.get(url).subscribe((results: any) => {  
      this.startPoint = results.features[0].place_name;
     // this.test = this.startPoint;
    });
  }

  ngAfterViewInit() {
      
    setTimeout (() => {
    //Map
      this.map = new Mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitude, this.latitude], // LNG, LAT
      zoom: 14 // starting zoom
      });
    
     
      this.map.addControl(new Mapboxgl.NavigationControl());
     

      //Marker für User Standort
      new Mapboxgl.Marker()
            .setLngLat([this.longitude, this.latitude])
            .addTo(this.map);
            this.sendGetRequest();

      //Taxi Marker
      for (let i=0; i<this.Taxis.length; i++) {
         new Mapboxgl.Marker({"color": "yellow"})
          .setLngLat([this.Taxis[i].taxiLongitude, this.Taxis[i].taxiLatitude])
          .addTo(this.map);
          this.sendGetRequest(); 

         

      }
      
      //Geocoderziel
      this.geocoderziel = new MapboxGeocoder({
     accessToken: environment.mapboxKey,
      countries: 'de',
      placeholder: 'Zieladresse eingeben',
      mapboxgl: Mapboxgl
      });
      document.getElementById('geocoderziel').appendChild(this.geocoderziel.onAdd(this.map));
        
        var self = this;
         this.geocoderziel.on('clear', function(e) {
            var layer = self.map.getLayer;
            if (this.layer = 'route') {
              self.map.removeLayer('route');
              self.map.removeSource('route');
            } else {
          } 
        });      
      }, 2000);     
  }

  geocoderst(){
    this.sendGetRequest();
    this.geocoderstart = new MapboxGeocoder({
    accessToken: environment.mapboxKey,
    countries: 'de',
    placeholder: 'Startpunkt eingeben',
    mapboxgl: Mapboxgl
    });
    //this.geocoderstart.addTo('#geocoderstart');
    document.getElementById('geocoderstart').appendChild(this.geocoderstart.onAdd(this.map));
    this.disableButton = true;
    }
 
  createRoute() {
    var geocoderJSON = this.geocoderziel.lastSelected;
    let geocoderObject = JSON.parse(geocoderJSON); 
    this.endPoint = geocoderObject.place_name;

    this.latSearch = this.geocoderziel.mapMarker._lngLat.lat;
    this.lngSearch = this.geocoderziel.mapMarker._lngLat.lng;

    if (this.startType == 'Eingabe'){
      this.latitude = this.geocoderstart.mapMarker._lngLat.lat;
      this.longitude = this.geocoderstart.mapMarker._lngLat.lng;
      var geocoderJSON = this.geocoderstart.lastSelected;
      let geocoderObject = JSON.parse(geocoderJSON);
      this.startPoint = geocoderObject.place_name;
      }
     
    console.log(this.geocoderziel)
    var urlDirections = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" +this.longitude + "," +this.latitude + ";" 
    +this.lngSearch +"," +this.latSearch + "?overview=full&annotations=duration,distance&geometries=geojson" +"&access_token=" 
    +environment.mapboxKey ;
    
    this.http.get(urlDirections).subscribe((results: any) => {  
    
     this.routeDuration = results.routes[0].duration/60;
     this.routeDistance = results.routes[0].distance/1000;
     this.map.addLayer({
         id: 'route',
         type: 'line',
         source: {
           type: 'geojson',
           data: {
             type: 'Feature',
             properties: {},
             geometry: results.routes[0].geometry,
           },
         },
         layout: {
           'line-join': 'round',
           'line-cap': 'round',
         },
         paint: {
           'line-color': '#ff7e5f',
           'line-width': 5,
          'line-opacity': 0.75
         },
       })    
     });
   }

   createJourney() {
     console.log(this.date);
    this.dateFormat = this.date.split('T')[0];
    var timeFormat = this.time.split('T')[1];

    this.journey = {
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      date: this.dateFormat,
      time: timeFormat,
      numberOfPersons: this.numberOfPersons,
      userID: this.currentUser.id
    }
    this.calculateTaxiRoutes();
   }

   async calculateTaxiRoutes(){
    for (let i=0; i<this.Taxis.length; i++) {

    var taxiLat = this.Taxis[i].taxiLatitude;
    var taxiLong = this.Taxis[i].taxiLongitude;
  
    var urlDirections = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" +this.longitude + "," +this.latitude + ";" 
    +taxiLong +"," + taxiLat + "?overview=full&annotations=duration,distance&geometries=geojson" +"&access_token=" 
    +environment.mapboxKey ;

    this.http.get(urlDirections).subscribe( async (results: any) => {  

      this.entfernung[this.Taxis[i]._id] = results.routes[0].distance/1000;
    });
  }     

    setTimeout(() => {

       this.calculateOptimalTaxi(this.entfernung);
       this.calculateCompleteRoute();

    }, 2000)
}

  calculateOptimalTaxi (object) {
    this.smallestValue = Number.MAX_VALUE;
    this.selectedKey = '';
    for (let key in object) {
      if (object[key] < this.smallestValue) {
        this.smallestValue = object[key];
        this.selectedKey = key;
      }
    }; 
  }

  calculateCompleteRoute() {
  
  this.journeyHinzufuegen(this.journey);

 
  }

  journeyHinzufuegen(journey){
    this.journeyService.addJourney(this.journey).subscribe((res) => {
      var journeyID = res._id;
      var completeDistance = this.smallestValue + this.routeDistance;
      var price = completeDistance * 1.15
      var taxiRoute = {
        taxiID: this.selectedKey,
        journeyID: journeyID,
        taxiDistance: this.smallestValue,
        completeDistance: completeDistance,
        price: price,
        date: this.dateFormat,
        userID: this.currentUser.id
      };    
    
    this.taxiRouteHinzufuegen(taxiRoute);
    this.createPopup(price);
     console.log(res._id);
      
    });
    
  }

  taxiRouteHinzufuegen(taxiRoute){
    this.taxiRouteService.addTaxiroute(taxiRoute).subscribe((res) => {
      console.log(res);
    })
  }
  async createPopup(Number) {

    var price = Math.round(Number * 100) / 100
    const alert = await this.alertController.create({
      header: 'Vielen Dank!',
      message: 'Ihr Taxi wurde erfolgreich gebucht. Die Kosten betragen: ' +price +"€",
      buttons: ['OK']
    });
    this.geocoderziel.clear();
    this.date = "";
    this.time = "";
    this.numberOfPersons = 0;
    this.paymentType = "";
    await alert.present();

  }
}
