import { Component, NgZone } from "@angular/core";
import { AlertController, Platform } from "@ionic/angular";
import { IonList } from "@ionic/angular";
import { TaxiService } from "./Services/taxi.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-taxiUnternehmen",
  templateUrl: "taxiUnternehmenView.html",
  styleUrls: ["taxiUnternehmen.scss"],
})
export class TaxiUnternehmenPage {
  Taxis: any = [];
  taxi: any;

  public varTaxiStatus: "frei";
  constructor(
    public alertController: AlertController,
    public platform: Platform,
    private taxiService: TaxiService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) { }

  ionViewDidEnter() {
    this.taxiService.getTaxiList().subscribe((res) => {
      this.Taxis = res;
    });
    return this.Taxis;
  }

  async hinzufuegenPopup() {
    const alert = await this.alertController.create({
      header: "Taxi hinzufügen",
      inputs: [
        {
          name: "taxiKennz",
          type: "text",
          id: "taxiKennz",
          placeholder: "Taxi Kennzeichen",
        },
        {
          name: "taxiGroesse",
          type: "text",
          id: "taxiGroesse",
          placeholder: "Taxi Größe",
        },
        {
          name: "taxiLongitude",
          type: "text",
          id: "taxiLongitude",
          placeholder: "Taxi Längengrad",
        },
        {
          name: "taxiLatitude",
          type: "text",
          id: "taxiLatitude",
          placeholder: "Taxi Breitengrad",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => { },
        },
        {
          text: "Taxi speichern",
          handler: async () => {
            let result = await alert.onDidDismiss();
            this.taxi = {
              taxiKennz: result.data.values.taxiKennz,
              taxiGroesse: result.data.values.taxiGroesse,
              taxiLongitude: result.data.values.taxiLongitude,
              taxiLatitude: result.data.values.taxiLatitude,
              verfügbarkeit: true,
            };
            this.taxiHinzufuegen();
            console.log("Confirm Ok");
          },
        },
      ],
    });
    await alert.present();
  }

  taxiHinzufuegen() {
    this.taxiService.addTaxi(this.taxi).subscribe((res) => {
      this.zone.run(() => {
        this.taxiService.getTaxiList().subscribe((res) => {
          this.Taxis = res;
        });
      });
    });
  }

  async updatePopup(Taxi) {
    const alert = await this.alertController.create({
      header: "Taxi bearbeiten",
      inputs: [
        {
          name: "taxiKennz",
          type: "text",
          id: "taxiKennz",
          value: Taxi.taxiKennz,
        },
        {
          name: "taxiGroesse",
          type: "text",
          id: "taxiGroesse",
          value: Taxi.taxiGroesse,
        },
        {
          name: "taxiLongitude",
          type: "text",
          id: "taxiLongitude",
          value: Taxi.taxiLongitude,
        },
        {
          name: "taxiLatitude",
          type: "text",
          id: "taxiLatitude",
          value: Taxi.taxiLatitude,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => { },
        },
        {
          text: "Ok",
          handler: async () => {
            let result = await alert.onDidDismiss();
            this.taxi = {
              taxiKennz: result.data.values.taxiKennz,
              taxiGroesse: result.data.values.taxiGroesse,
              taxiLongitude: result.data.values.taxiLongitude,
              taxiLatitude: result.data.values.taxiLatitude,
              verfügbarkeit: true,
            };
            this.updateTaxi(Taxi);
            console.log("Confirm Ok");
          },
        },
      ],
    });
    await alert.present();
  }

  updateTaxi(Taxi) {
    this.taxiService.updateTaxi(Taxi._id, this.taxi).subscribe((res) => {
      this.zone.run(() => {
        this.taxiService.getTaxiList().subscribe((res) => {
          this.Taxis = res;
        });
      });
    });
  }
  deleteTaxi(Taxi) {
    this.taxiService.deleteTaxi(Taxi._id).subscribe((res) => {
      this.zone.run(() => {
        this.taxiService.getTaxiList().subscribe((res) => {
          this.Taxis = res;
        });
      });
    });
  }
}
