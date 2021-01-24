import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './User/services/auth-guard.service';
const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './User/Login/login.module#LoginPageModule'},
  { path: 'global', 
    loadChildren: './Global/global.module#GlobalPageModule',
    canActivate: [AuthGuardService]
  },
  { path: '', 
    loadChildren: './Global/global.module#GlobalPageModule' },
  {
    path: 'registrierung',
    loadChildren: () => import('./User/Registrierung/registrierung.module').then( m => m.RegistrierungPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
