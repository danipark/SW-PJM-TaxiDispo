import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KontoPageRoutingModule } from './konto-routing.module';

import { KontoPage } from './konto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KontoPageRoutingModule
  ],
  declarations: [KontoPage]
})
export class KontoPageModule {}
