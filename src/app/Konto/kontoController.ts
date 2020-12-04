import { Component, OnInit } from '@angular/core';
import { TaxirouteService } from '../TaxiCompany/TaxiManagement/Services/taxiroute.service';
import { JourneyService } from '../Journey/Services/journey.service';
import { AuthService } from '../Login_new/services/auth.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-konto',
  templateUrl: './kontoView.html',
  styleUrls: ['./konto.scss'],
})
export class KontoPage {

   
  TaxiRoutes: any = [];
  Journeys: any = [];
  mergedObject: any = [];
  currentUser: any;
  User: any;
  points: any;
  constructor(
    private taxiRouteService: TaxirouteService,
    private journeyService: JourneyService,
    private authService: AuthService,
  ) {
  
    this.currentUser = this.authService.user;

    this.authService.getUser(this.currentUser.id).subscribe((res) =>{
      this.User = res;
      this.points = this.User.points
    })

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
   }


  ionViewWillEnter() {

    console.log(this.currentUser)

    
    
    setTimeout(() => {
      this.mergedObject = this.TaxiRoutes.map((item, i) => Object.assign({}, item, this.Journeys[i]))
      for (var i = 0; i < this.mergedObject.length; i++) {
        this.mergedObject[i].price = Math.round(this.mergedObject[i].price *100)/100;
        this.mergedObject[i].completeDistance = Math.round(this.mergedObject[i].completeDistance * 100)/100; 
      }
      console.log(this.mergedObject)
    }, 1000)
  }


  generatePdf(){
    const documentDefinition = {content: 'Hier könnte ihre Taxifahrt stehen' }
        pdfMake.createPdf(documentDefinition).open();
   }
  
}
