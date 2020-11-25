import { Component, OnInit } from '@angular/core';
import { TaxirouteService } from '../TaxiCompany/TaxiManagement/Services/taxiroute.service';
import { JourneyService } from '../Journey/Services/journey.service';
import { AuthService } from '../Login_new/services/auth.service';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.page.html',
  styleUrls: ['./konto.page.scss'],
})
export class KontoPage {
  
  TaxiRoutes: any = [];
  Journeys: any = [];
  mergedObject: any = [];
  currentUser: any;
  constructor(
    private taxiRouteService: TaxirouteService,
    private journeyService: JourneyService,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.user;
   }


  ionViewWillEnter() {

    console.log(this.currentUser)

    this.taxiRouteService.getTaxiroutesById(this.currentUser.id).subscribe((res) => {
      this.TaxiRoutes = res;
      console.log(this.TaxiRoutes);
      }
    )
    
    this.journeyService.getJourneysById(this.currentUser.id).subscribe((res) => {
      this.Journeys = res;
      console.log(this.Journeys);
      console.log(this.Journeys.length);
      }
    )
    
    setTimeout(() => {
      this.mergedObject = this.TaxiRoutes.map((item, i) => Object.assign({}, item, this.Journeys[i]))
      for (var i = 0; i < this.mergedObject.length; i++) {
        this.mergedObject[i].price = Math.round(this.mergedObject[i].price + Number.EPSILON)/100;
        this.mergedObject[i].completeDistance = Math.round(this.mergedObject[i].completeDistance + Number.EPSILON)/100; 
      }
      console.log(this.mergedObject)
    }, 1000)
  }

  
}
