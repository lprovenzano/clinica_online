import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClinicComponent} from "../../components/clinic/clinic/clinic.component";
import {AdminGuard} from "../../shared/guard/admin.guard";
import {MyProfileComponent} from "../../components/clinic/my-profile/my-profile.component";

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'clinic', component: ClinicComponent
    },
    {
      path: 'admin',
      loadChildren: () => import('../administrator/administrator.module').then(m => m.AdministratorModule),
      canActivate: [AdminGuard]
    },
    {
      path: 'specialist',
      loadChildren: () => import('../specialist/specialist.module').then(m => m.SpecialistModule)
    },
    {
      path: 'my-profile', component: MyProfileComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
