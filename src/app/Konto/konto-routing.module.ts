import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KontoPage } from './konto.page';

const routes: Routes = [
  {
    path: '',
    component: KontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KontoPageRoutingModule {}
