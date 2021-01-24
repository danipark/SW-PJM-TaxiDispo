import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './User/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any;
  currentUser: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['global']);
          this.currentUser = this.authService.user;
          this.sideMenu()
        } else {
          this.router.navigate(['login']);
          this.currentUser = this.authService.user;
        }
      });
    });
  }

  sideMenu() {
    if (this.currentUser.role === 'customer' || this.currentUser.role === 'businessCustomer') {
      this.navigationForCustomers();
    } else {
      this.navigationForEmployees();
    }
  }

  navigationForCustomers() {
    this.navigate =
      [
        {
          title: "Konto",
          url: "/TaxiDispo/account",
          icon: "person"
        },
        {
          title: "Logout",
          url: "/login",
          icon: "power",
        }
      ]
  }

  navigationForEmployees() {
    this.navigate =
      [
        {
          title: "Logout",
          url: "/login",
          icon: "power"
        }
      ]
  }
}
