import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Login_new/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-Global',
  templateUrl: 'globalView.html',
  styleUrls: ['global.scss']
})
export class GlobalPage implements OnInit {

  currentUser: any;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit() {
    // Navigation zu den Pages, die für den angemeldeten Benutzer relevant sind  
    if (this.currentUser.role === 'customer' || this.currentUser.role === 'businessCustomer') {
      this.navCtrl.navigateForward('/TaxiDispo/journey');
    } else {
      this.navCtrl.navigateForward('/TaxiDispo/taxiUnternehmen');
    }
  }
}