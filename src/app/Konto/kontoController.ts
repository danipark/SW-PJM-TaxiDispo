import { Component, OnInit } from '@angular/core';
import { TaxirouteService } from '../TaxiCompany/TaxiManagement/Services/taxiroute.service';
import { JourneyService } from '../Journey/Services/journey.service';
import { AuthService } from '../Login_new/services/auth.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlertController } from '@ionic/angular';
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
  pdfpreis: any= [];
  t:any;
  selectedRadioGroup:any;
  constructor(
    private taxiRouteService: TaxirouteService,
    private journeyService: JourneyService,
    private authService: AuthService,
    public alertController: AlertController
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
        this.t=i;
        this.mergedObject[i].price = Math.round(this.mergedObject[i].price *100)/100;
        this.mergedObject[i].completeDistance = Math.round(this.mergedObject[i].completeDistance * 100)/100; 
      }
      console.log(this.mergedObject)
    }, 1000)
    

  }
  generatePdf(item){
    var documentDefinition:any;
    
    documentDefinition = {
      content:'Name '+ this.User.firstName + ' ' + this.User.lastName +' Adresse: ' + this.User.address
        + ' Preis ' + item.price+'€'}
    
    pdfMake.createPdf(documentDefinition).open();
  }
  async createPopup(){
    const alert = await this.alertController.create({
      header: 'Gutschein',
      message: 'Für 100 Punkte können Sie sich einen Gutschein-Code generieren. Dieser ermöglicht Ihnen 10% Rabatt bei der nächsten Taxifahrt!',    
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {          }
        }, {
          text: 'Gutschein-Code generieren',
           handler: async () => {
            console.log('ok')
          }
        }
      ]
    });
    await alert.present();
   }
}
