import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JourneyPage } from './journeyController';


import { JourneyPageRoutingModule } from './journey-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    JourneyPageRoutingModule
  ],
  declarations: [JourneyPage]
})
export class JourneyPageModule {}
