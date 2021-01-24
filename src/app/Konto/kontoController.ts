import { Component, OnInit } from "@angular/core";
import { TaxirouteService } from "../TaxiCompany/TaxiManagement/Services/taxiroute.service";
import { JourneyService } from "../Journey/Services/journey.service";
import { AuthService } from "../User/services/auth.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AlertController } from "@ionic/angular";
import { KontoService } from "./Services/konto.service";
import { JourneyPage } from "../Journey/journeyController";
import { environment } from "src/environments/environment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-konto",
  templateUrl: "./kontoView.html",
  styleUrls: ["./konto.scss"],
})
export class KontoPage {
  TaxiRoutes: any = [];
  Journeys: any = [];
  mergedObject: any = [];
  currentUser: any;
  User: any;
  points: any;
  rolle;

  voucher: any;
  voucherID: number;

  selectedRadioGroup: any;
  constructor(
    private taxiRouteService: TaxirouteService,
    private journeyService: JourneyService,
    private authService: AuthService,
    public alertController: AlertController,
    private kontoService: KontoService
  ) { }

  ionViewWillEnter() {
    this.currentUser = this.authService.user;
    this.getUser();
    this.getTaxiRoutes();
    this.getJourneys();
    setTimeout(() => {
      this.mergeTaxiRoutesAndJourneys();
    }, 1000);
  }
  getUser() {
    this.authService.getUser(this.currentUser.id).subscribe((res) => {
      this.User = res;
      this.points = this.User.points;
    });
  }

  getTaxiRoutes() {
    this.taxiRouteService
      .getTaxiroutesById(this.currentUser.id)
      .subscribe((res) => {
        this.TaxiRoutes = res;
        console.log(this.TaxiRoutes);
      });
  }

  getJourneys() {
    this.journeyService
      .getJourneysById(this.currentUser.id)
      .subscribe((res) => {
        this.Journeys = res;
        console.log(this.Journeys);
        console.log(this.Journeys.length);
      });
  }

  mergeTaxiRoutesAndJourneys() {
    this.mergedObject = this.TaxiRoutes.map((item, i) =>
      Object.assign({}, item, this.Journeys[i])
    );
    for (var i = 0; i < this.mergedObject.length; i++) {
      this.mergedObject[i].price =
        Math.round(this.mergedObject[i].price * 100) / 100;
      this.mergedObject[i].completeDistance =
        Math.round(this.mergedObject[i].completeDistance * 100) / 100;
    }
  }

  generatePdf(item) {
    var documentDefinition: any;

    if (this.User.role == "businessCustomer") {
      this.rolle = "Unternehmensname: " + this.User.companyName;
    } else {
      this.rolle = " ";
    }

    documentDefinition = {
      info: {
        title: "Rechnung_TaxiDispo",
      },
      header: [{ text: "TaxiDispo", fontSize: 16, margin: [38, 20, 0, 15] }],
      content: [
        {
          columns: [
            {
              text:
                "Rechnung für: " +
                this.User.firstName +
                " " +
                this.User.lastName,
              fontSize: 13,
              margin: [0, 16, 0, 0],
            },
            {
              image: environment.imgpdf,
              alignment: "right",
              width: 50,
              height: 50,
            },
          ],
        },
        {
          text: "Adresse: " + this.User.address + " " + this.rolle,
          fontSize: 13,
          margin: [0, 16, 0, 0],
        },
        {
          text: "Ihre Fahrt vom: " + item.date,
          fontSize: 13,
          margin: [0, 30, 0, 0],
        },
        {
          text: "Startpunkt: " + item.startPoint,
          fontSize: 12,
          margin: [0, 16, 0, 0],
        },
        {
          text: "Endpunkt: " + item.endPoint,
          fontSize: 12,
          margin: [0, 16, 0, 0],
        },
        {
          text: "Distanz: " + item.completeDistance + " km",
          fontSize: 12,
          margin: [0, 16, 0, 0],
        },
        {
          text: "Preis: " + item.price + " €",
          fontSize: 14,
          underline: true,
          margin: [0, 25, 0, 0],
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  async createPopupForVoucher() {
    if (this.User.points >= 1000) {
      const alert = await this.alertController.create({
        header: "Gutschein",
        message:
          "Für 1000 Punkte können Sie sich einen Gutschein-Code generieren. Dieser ermöglicht Ihnen 10% Rabatt bei der nächsten Taxifahrt!",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => { },
          },
          {
            text: "Gutschein-Code generieren",
            handler: async () => {
              this.voucher = {
                active: true,
                userID: this.currentUser.id,
              };

              this.kontoService.addVoucher(this.voucher).subscribe((res) => {
                this.voucherID = res._id;
                this.calculateNewPoints();
                this.updateUser(this.currentUser);
                this.points = this.User.points;
                this.alertWithVoucherCode();
                console.log("Gutschein-Code: " + this.voucherID);
              });
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.alertNotEnoughPointsForVoucher();
    }
  }

  calculateNewPoints() {
    this.User.points = this.User.points - 1000;
  }

  async alertWithVoucherCode() {
    const alert = await this.alertController.create({
      header: "Ihr Gutschein-Code",
      message:
        "Bitte speichern Sie den Gutschein-Code ab. Dieser ist nur jetzt sichtbar! Gutschein-Code: " +
        this.voucherID,
      buttons: [
        {
          text: "Ok",
          role: "cancel",
          cssClass: "secondary",
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  async alertNotEnoughPointsForVoucher() {
    const alert = await this.alertController.create({
      header: "Gutschein",
      message:
        "Leider besitzen Sie noch nicht genügend Punkte für einen 10% Rabatt Gutscheincode!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }
  updateUser(currentUser) {
    this.authService.updateUser(currentUser.id, this.User).subscribe((res) => {
      this.authService.getUser(this.currentUser.id).subscribe((res) => {
        this.User = res;
      });
    });
  }
}
