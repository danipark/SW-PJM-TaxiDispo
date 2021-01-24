import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrierungPage } from './registrierungController';

const routes: Routes = [
  {
    path: '',
    component: RegistrierungPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrierungPageRoutingModule {}
