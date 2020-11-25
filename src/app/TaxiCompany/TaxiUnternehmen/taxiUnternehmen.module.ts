import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxiUnternehmenPage } from './taxiUnternehmenController';


import { TaxiUnternehmenPageRoutingModule } from './taxiUnternehmen-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaxiUnternehmenPageRoutingModule
  ],
  declarations: [TaxiUnternehmenPage]
})
export class TaxiUnternehmenPageModule {}
