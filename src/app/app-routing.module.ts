import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/guard/auth.guard";
import {ApprovedGuard} from "./shared/guard/approved.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'clinic',
    loadChildren: () => import('./modules/clinic/clinic.module').then(m => m.ClinicModule),
    canActivate: [AuthGuard, ApprovedGuard]
  }, {
    path: '**',
    redirectTo: 'clinic'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
