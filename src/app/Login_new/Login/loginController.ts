import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './loginView.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {
 
  credentialsForm: FormGroup;
 
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private navCtrl: NavController) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    this.navCtrl.navigateForward('/registrierung')
  }
 
}
