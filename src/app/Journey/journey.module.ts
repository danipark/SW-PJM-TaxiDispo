import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyPage } from './journeyController';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JourneyPageRoutingModule } from './journey-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    JourneyPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [JourneyPage]
})
export class JourneyPageModule {}
