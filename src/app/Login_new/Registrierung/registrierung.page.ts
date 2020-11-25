import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.page.html',
  styleUrls: ['./registrierung.page.scss'],
})
export class RegistrierungPage implements OnInit {

  
  registerForm: FormGroup;
  selectedRadioGroup:any;
  geocoder: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
 
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });

    //Geocoder
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapboxKey,
      countries: 'de',
      placeholder: 'Addresse',
      mapboxgl: Mapboxgl
      });
      this.geocoder.addTo('#geocoder');
    
  }
 
  radioGroupChange(event){
    this.selectedRadioGroup = event.detail.value;
    console.log(this.selectedRadioGroup)
    if (this.selectedRadioGroup == "Geschäftskunde"){
      this.registerForm.addControl('role', new FormControl('', Validators.required));
      this.registerForm.controls['role'].setValue('businessCustomer')
      this.registerForm.addControl('companyName', new FormControl('', Validators.required));
      
    
    } else {
      this.registerForm.addControl('role', new FormControl('', Validators.required));
      this.registerForm.controls['role'].setValue('customer')
    }
      

   



  }

  onSubmit() {

    //Addresse der Form hinzufügen
    var geocoderJSON = this.geocoder.lastSelected;
    let geocoderObject = JSON.parse(geocoderJSON);
    var address = geocoderObject.place_name;

    console.log(address);
    this.registerForm.addControl('address', new FormControl('', Validators.required));
    this.registerForm.controls['address'].setValue(address)
    console.log(this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe(res => {
      // Call Login um automatisch User einzuloggen
      this.authService.login(this.registerForm.value).subscribe();
    });  
  }
 

}
