import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxiManagementPage } from './taxiManagementController';

const routes: Routes = [
  {
    path: '',
    component: TaxiManagementPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxiManagementPageRoutingModule {}
