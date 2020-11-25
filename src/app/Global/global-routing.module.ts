import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalPage } from './globalController';

const routes: Routes = [
  {
    path: 'TaxiDispo',
    component: GlobalPage,
    children: [
      {
        path: 'journey',
        loadChildren: () => import('../Journey/journey.module').then(m => m.JourneyPageModule)
      },
      {
        path: 'taxiUnternehmen',
        loadChildren: () => import('../TaxiCompany/TaxiUnternehmen/taxiUnternehmen.module').then(m => m.TaxiUnternehmenPageModule)
      },
      {
        path: 'taxiManagement',
        loadChildren: () => import('../TaxiCompany/TaxiManagement/taxiManagement.module').then(m => m.TaxiManagementPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../Konto/konto.module').then( m => m.KontoPageModule),    
      },
      {
        path: '',
        redirectTo: '/TaxiDispo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/TaxiDispo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalPageRoutingModule {}
