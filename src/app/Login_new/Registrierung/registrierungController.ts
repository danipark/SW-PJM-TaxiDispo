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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formsModule: FormsModule) { }

  ngOnInit() {
    this.formForRegister();
    this.geocoderForAddress();
  }

  formForRegister() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      kunde: ['', [Validators.required, Validators.minLength(1)]],
      points: [0]
    });
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
    this.registerForm.addControl('role', new FormControl('', Validators.required));
    this.registerForm.controls['role'].setValue('businessCustomer')
    this.registerForm.addControl('companyName', new FormControl('', Validators.required));
  }

  selectPrivateCustomer() {
    this.registerForm.addControl('role', new FormControl('', Validators.required));
    this.registerForm.controls['role'].setValue('customer')
  }

  onSubmit() {
    //Addresse der Form hinzufügen
    var geocoderJSON = this.geocoder.lastSelected;
    let geocoderObject = JSON.parse(geocoderJSON);
    var address = geocoderObject.place_name;

    this.registerForm.addControl('address', new FormControl('', Validators.required));
    this.registerForm.controls['address'].setValue(address)

    this.authService.register(this.registerForm.value).subscribe(res => {
      // Call Login um automatisch User einzuloggen
      this.authService.login(this.registerForm.value).subscribe();
    });
  }
}
