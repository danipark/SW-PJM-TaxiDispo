import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GlobalPageRoutingModule } from './global-routing.module';

import { GlobalPage } from './globalController';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GlobalPageRoutingModule
  ],
  declarations: [GlobalPage]
})
export class GlobalPageModule {}
