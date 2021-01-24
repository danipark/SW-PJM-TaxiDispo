import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierungView.html',
  styleUrls: ['./registrierung.scss'],
})
export class RegistrierungPage implements OnInit {


  registerForm: FormGroup;
  selectedRadioGroup: any;
  geocoder: any;
  validations_form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formsModule: FormsModule) { }

  ngOnInit() {
    this.formForRegister();
    this.geocoderForAddress();
  }

  formForRegister() {
    this.validations_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),])],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z-]+$'),])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z-]+$'),])],
      kunde: ['', Validators.compose([Validators.required, Validators.minLength(1),])],
      points: [0]
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'E-Mail darf nicht leer sein!'},
      { type: 'pattern', message: 'E-Mail muss ein @-Zeichen beinhalten.'}
    ],
    'password': [ 
      { type: 'required', message: 'Passwort darf nicht leer sein!'},
      { type: 'minlength', message: 'Passwort muss aus mindestens 6 Zeichen bestehen!'},
      { type: 'pattern', message: 'Passwort muss einen Groß- und Kleinbuchstaben, sowie eine Zahl beinhalten.'}
    ],
    'firstName': [ 
      { type: 'required', message: 'Vorname darf nicht leer sein!'},
      { type: 'minlength', message: 'Vorname muss aus mindestens 2 Buchstaben bestehen!'},
      { type: 'pattern', message: 'Vorname darf nur aus Buchstaben bestehen.'}
    ],
    'lastName': [ 
      { type: 'required', message: 'Nachname darf nicht leer sein!'},
      { type: 'minlength', message: 'Nachname muss aus mindestens 2 Buchstaben bestehen!'},
      { type: 'pattern', message: 'Nachname darf nur aus Buchstaben bestehen.'}
    ],
    'companyName': [
      { type: 'required', message: 'Unternehmensname darf nicht leer sein!'},
    ],
  }

  geocoderForAddress() {
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapboxKey,
      countries: 'de',
      placeholder: 'Addresse',
      mapboxgl: Mapboxgl
    });
    this.geocoder.addTo('#geocoder');
  }

  radioGroupChange(event) {
    this.selectedRadioGroup = event.detail.value;
    if (this.selectedRadioGroup == "Geschäftskunde") {
      this.selectBusinessCustomer();
    } else {
      this.selectPrivateCustomer();
    }
  }

  selectBusinessCustomer() {
    this.validations_form.addControl('role', new FormControl('', Validators.required));
    this.validations_form.controls['role'].setValue('businessCustomer')
    this.validations_form.addControl('companyName', new FormControl('', Validators.required));
  }

  selectPrivateCustomer() {
    this.validations_form.addControl('role', new FormControl('', Validators.required));
    this.validations_form.controls['role'].setValue('customer')
  }

  onSubmit() {
    //Addresse der Form hinzufügen
    var geocoderJSON = this.geocoder.lastSelected;
    let geocoderObject = JSON.parse(geocoderJSON);
    var address = geocoderObject.place_name;

    this.validations_form.addControl('address', new FormControl('', Validators.required));
    this.validations_form.controls['address'].setValue(address)

    this.authService.register(this.validations_form.value).subscribe(res => {
      // Call Login um automatisch User einzuloggen
      this.authService.login(this.validations_form.value).subscribe();
    });
  }
}
