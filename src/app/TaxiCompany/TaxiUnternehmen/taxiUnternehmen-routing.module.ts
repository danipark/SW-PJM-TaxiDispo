import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxiUnternehmenPage } from './taxiUnternehmenController';

const routes: Routes = [
  {
    path: '',
    component: TaxiUnternehmenPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxiUnternehmenPageRoutingModule {}
