import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrierungPageRoutingModule } from './registrierung-routing.module';

import { RegistrierungPage } from './registrierung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrierungPageRoutingModule
  ],
  declarations: [RegistrierungPage]
})
export class RegistrierungPageModule {}
