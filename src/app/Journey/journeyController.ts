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
import { KontoService } from '../Konto/Services/konto.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-Journey',
  templateUrl: 'journeyView.html',
  styleUrls: ['journey.scss']
})



export class JourneyPage implements OnInit {

  selectedKey: any;
  smallestValue: any;

  //Koordinaten
  public latitude: number;
  public longitude: number;
  public latitude2: number;
  public longitude2: number;
  public map: Mapboxgl.Map;
  Taxis: any = [];
  dateFormat: any;

  //User
  currentUser: any;
  User: any;

  selectedOption: any;
  visability: boolean = true;

  journeyForm: FormGroup;

  constructor(
    private mapboxService: MapboxServiceService,
    private geolocation: Geolocation,
    private http: HttpClient,
    private taxiService: TaxiService,
    private journeyService: JourneyService,
    private taxiRouteService: TaxirouteService,
    private kontoService: KontoService,
    private alertController: AlertController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {

    this.currentUser = this.authService.user;

    //User-Objekt 
    this.authService.getUser(this.currentUser.id).subscribe((res) => {
      this.User = res
    })
    //Liste der Taxis
    this.taxiService.getTaxiList().subscribe((res) => {
      this.Taxis = res;
      console.log(this.Taxis)
    });
  }

  addresses: string[] = [];
  selectedAddress = null;
  geocoderstart: any;
  geocoderziel: any;
  urlDirectionsStart: any;
  geocoderObjectStart: any;
  latSearch: any;
  lngSearch: any;

  //journey
  journey: any;
  startPoint: string = "";
  endPoint: string = "";
  date: String = "";
  time: String = "";
  numberOfPersons: number;
  stringForStartPoint: string = "";

  //route
  route: any;
  price: number;
  routeDistance: number;
  routeDuration: number;
  taxiRoute: any;
  distance_rounded: number;
  points: number;
  voucherCode: String;
  voucher: any;

  //Payment
  paymentType: string = "";
  completeDistance: number;
  entfernung = {};

  //PayPal
  paymentAmount;
  currency: string = 'EUR';
  currencyIcon: string = '€';



  //Button nur 1x klicken
  disableButton;

  ngOnInit() {

    this.buildJourneyForm();

    var geoOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    this.geolocation.getCurrentPosition(geoOptions).then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.longitude + "," + this.latitude + ".json?language=de&access_token=" + environment.mapboxKey;
      this.http.get(url).subscribe((results: any) => {
        this.startPoint = results.features[0].place_name;
      });
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    })
  }


  buildJourneyForm() {
    this.journeyForm = this.formBuilder.group({
      dateForm: ['', [Validators.required, Validators.minLength(1)]],
      timeForm: ['', [Validators.required, Validators.minLength(1)]],
      numberOfPersonsForm: ['', [Validators.required, Validators.minLength(1)]],
      paymentTypeForm: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  public sendGetRequest() {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.longitude + "," + this.latitude + ".json?language=de&access_token=" + environment.mapboxKey;
    this.http.get(url).subscribe((results: any) => {
      this.startPoint = results.features[0].place_name;
      this.stringForStartPoint = this.startPoint;
    });
  }

  selectOnlinePayment(event) {
    this.selectedOption = event.detail.value;
    if (this.selectedOption == "paypal") {
      this.calculateTaxiRoutes();
      this.paymentAmount = this.price;
      this.visability = false;
      let _this = this;
      setTimeout(() => {
        window['paypal'].Buttons({
          // Wird aufgerufen wenn PayPal Button ausgewählt wird
          style: {
            layout: "horizontal",
            color: "gold",
            shape: "rect",
            label: "paypal"
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: _this.paymentAmount
                }
              }]
            });
          },
          // Erfolgreiche Abwicklung
          onApprove: function (data, actions) {
            return actions.order.capture()
              .then(function (details) {
                _this.createJourney();
                // _this.clearField();
                //  alert('Bezahlung von ' + _this.paymentAmount + ' € erfolgreich durchgeführt von: ' + details.payer.name.given_name + '!');

              })
              .catch(err => {
                console.log(err);
              })
          }
        }).render('#paypal-button-container');
      }, 500)


    } else {
      this.visability = true;

    }
  }

  ngAfterViewInit() {

    setTimeout(() => {
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
      for (let i = 0; i < this.Taxis.length; i++) {
        new Mapboxgl.Marker({ "color": "yellow" })
          .setLngLat([this.Taxis[i].taxiLongitude, this.Taxis[i].taxiLatitude])
          .addTo(this.map);
        this.sendGetRequest();



      }

      //Geocoderstart
      this.geocoderstart = new MapboxGeocoder({
        accessToken: environment.mapboxKey,
        countries: 'de',
        placeholder: this.startPoint,
        mapboxgl: Mapboxgl
      });
      document.getElementById('geocoderstart').appendChild(this.geocoderstart.onAdd(this.map));
      var self = this;
      this.geocoderstart.on('clear', function (e) {
        self.sendGetRequest();
        this.geocoderObjectStart = null;
        var layer = self.map.getLayer;
        if (this.layer = 'route') {
          self.map.removeLayer('route');
          self.map.removeSource('route');
        } else {
        }
      });

      //Geocoderziel
      this.geocoderziel = new MapboxGeocoder({
        accessToken: environment.mapboxKey,
        countries: 'de',
        placeholder: 'Zielpunkt eingeben',
        mapboxgl: Mapboxgl
      });
      document.getElementById('geocoderziel').appendChild(this.geocoderziel.onAdd(this.map));

      var self = this;
      this.geocoderziel.on('clear', function (e) {

        var layer = self.map.getLayer;
        if (this.layer = 'route') {
          self.map.removeLayer('route');
          self.map.removeSource('route');
        } else {
        }
      });
    }, 2000);
  }

  createStartPoint() {
    var geocoderStartJSON = this.geocoderstart.lastSelected;
    let geocoderObjectStart = JSON.parse(geocoderStartJSON);
    this.startPoint = geocoderObjectStart.place_name;
    console.log(this.startPoint)
  }

  createRoute() {
    var geocoderStartJSON = this.geocoderstart.lastSelected;
    this.geocoderObjectStart = JSON.parse(geocoderStartJSON);

    if (this.geocoderObjectStart == null) {
      this.latitude = this.latitude;
      this.longitude = this.longitude;
      this.startPoint = this.startPoint;
      this.urlDirectionsStart = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" + this.longitude + "," + this.latitude + ";"


    } else {
      this.latitude2 = this.geocoderstart.mapMarker._lngLat.lat;
      this.longitude2 = this.geocoderstart.mapMarker._lngLat.lng;
      this.startPoint = this.geocoderObjectStart.place_name;

      this.urlDirectionsStart = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" + this.longitude2 + "," + this.latitude2 + ";"

    }

    var geocoderZielJSON = this.geocoderziel.lastSelected;
    let geocoderObject = JSON.parse(geocoderZielJSON);
    this.endPoint = geocoderObject.place_name;

    this.latSearch = this.geocoderziel.mapMarker._lngLat.lat;
    this.lngSearch = this.geocoderziel.mapMarker._lngLat.lng;


    var urlDirections = this.urlDirectionsStart + this.lngSearch + "," + this.latSearch + "?overview=full&annotations=duration,distance&geometries=geojson" + "&access_token="
      + environment.mapboxKey;

    console.log("Test:" + urlDirections);
    this.http.get(urlDirections).subscribe((results: any) => {
      this.routeDuration = results.routes[0].duration / 60;
      this.routeDistance = results.routes[0].distance / 1000;
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
    this.calculateTaxiRoutes();

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
    this.saveJourney(this.journey);
  }

  async calculateTaxiRoutes() {
    for (let i = 0; i < this.Taxis.length; i++) {
      var taxiLat = this.Taxis[i].taxiLatitude;
      var taxiLong = this.Taxis[i].taxiLongitude;
      var urlDirections = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" + this.longitude + "," + this.latitude + ";"
        + taxiLong + "," + taxiLat + "?overview=full&annotations=duration,distance&geometries=geojson" + "&access_token="
        + environment.mapboxKey;
      this.http.get(urlDirections).subscribe(async (results: any) => {

        this.entfernung[this.Taxis[i]._id] = results.routes[0].distance / 1000;
      });
    }
    setTimeout(() => {
      this.calculateOptimalTaxi(this.entfernung);
      this.calculateCompleteRoute();
      this.calculatePrice();
      this.roundNumbers();
    }, 2000)
  }

  calculateOptimalTaxi(object) {
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
    this.completeDistance = this.smallestValue + this.routeDistance;
  }

  calculatePrice() {
    this.price = this.completeDistance * 1.15
  }

  calculateDiscountedPrice() {
    if (this.voucherCode != '') {
      this.kontoService.getVoucherById(this.voucherCode).subscribe((data) => {
        this.voucher = data;
        if (this.voucherCode == this.voucher._id && this.voucher.active == true) {
          this.price = this.price * 0.9
          this.price = Math.round((this.price + Number.EPSILON) * 100) / 100
          this.voucher.active = false;
          this.kontoService.updateVoucher(this.voucherCode, this.voucher).subscribe((res) => {
          })
        } else {
          this.createPopUpForInvalidVoucher();
          this.clearVoucherField();
        }
      })
    } else {
    }
  }

  async createPopUpForInvalidVoucher() {
    const alert = await this.alertController.create({
      header: 'Gutschein',
      message: 'Leider ist der eingegebene Gutscheincode ungültig!',
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => { }
        }]
    });
    await alert.present();
  }

  clearVoucherField() {
    this.voucherCode = ''
  }

  roundNumbers() {
    this.price = Math.round((this.price + Number.EPSILON) * 100) / 100
    this.completeDistance = Math.round((this.completeDistance + Number.EPSILON) * 100) / 100
  }

  saveJourney(journey) {
    this.journeyService.addJourney(this.journey).subscribe((res) => {
      var journeyID = res._id;
      this.createTaxiRoute(journeyID);
      this.saveTaxiRoute(this.taxiRoute);
      this.savePoints(this.taxiRoute, this.currentUser);
      this.createPopup();
      console.log(res._id);
    });
  }

  createTaxiRoute(journeyID) {
    this.taxiRoute = {
      taxiID: this.selectedKey,
      journeyID: journeyID,
      taxiDistance: this.smallestValue,
      completeDistance: this.completeDistance,
      price: this.price,
      date: this.dateFormat,
      userID: this.currentUser.id
    };
  }
  saveTaxiRoute(taxiRoute) {
    this.taxiRouteService.addTaxiroute(taxiRoute).subscribe((res) => {
      console.log(res);
    })
  }

  savePoints(taxiRoute, currentUser) {
    console.log("Vor Kalkulation:" + this.User.points)
    this.roundDistance(taxiRoute)
    this.refactorStringToNumber();
    this.calculatePoints();
    this.updateUser(currentUser);
    console.log("Nach Kalkulation:" + this.User.points)
  }

  roundDistance(taxiRoute) {
    this.distance_rounded = Math.round(taxiRoute.completeDistance)
  }

  calculatePoints() {
    this.points = this.distance_rounded * 1
    this.User.points = this.User.points + this.points
  }

  refactorStringToNumber() {
    this.User.points = Number(this.User.points)
  }

  updateUser(currentUser) {
    this.authService.updateUser(currentUser.id, this.User).subscribe((res) => {
      this.authService.getUser(this.currentUser.id).subscribe((res) => {
        this.User = res
      })
    })
  }


  async createPopup() {
    const alert = await this.alertController.create({
      header: 'Vielen Dank!',
      message: 'Ihr Taxi wurde erfolgreich gebucht. Die Kosten betragen: ' + this.price + "€",
      buttons: ['OK']
    });
    this.geocoderstart.clear();
    this.date = "";
    this.time = "";
    this.numberOfPersons = 0;
    this.paymentType = "";
    this.price = 0;

    await alert.present();
  }
  async clearField() {
    this.geocoderstart.clear();
    this.date = "";
    this.time = "";
    this.numberOfPersons = 0;
    this.paymentType = "";
    this.price = 0;
  }


}
