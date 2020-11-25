import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaxiManagementPage } from './taxiManagementController';


import { TaxiManagementPageRoutingModule } from './taxiManagement-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TaxiManagementPage }]),
    TaxiManagementPageRoutingModule,
  ],
  declarations: [TaxiManagementPage]
})
export class TaxiManagementPageModule {}
