import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Login_new/services/auth-guard.service';
const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './Login_new/Login/login.module#LoginPageModule'},
  { path: 'global', 
    loadChildren: './Global/global.module#GlobalPageModule',
    canActivate: [AuthGuardService]
  },
  { path: '', 
    loadChildren: './Global/global.module#GlobalPageModule' },
  {
    path: 'registrierung',
    loadChildren: () => import('./Login_new/Registrierung/registrierung.module').then( m => m.RegistrierungPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
