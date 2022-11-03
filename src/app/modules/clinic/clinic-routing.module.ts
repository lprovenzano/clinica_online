import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClinicComponent} from "../../components/clinic/clinic/clinic.component";
import {SpecialistManagerComponent} from "../../components/clinic/administrator/specialist-manager/specialist-manager.component";
import {CreateAdminComponent} from "../../components/clinic/administrator/create-admin/create-admin.component";
import {AdminGuard} from "../../shared/guard/admin.guard";
import {CreateDiaryComponent} from "../../components/clinic/clinic/specialist/create-diary/create-diary.component";

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'clinic', component: ClinicComponent
    },
    {
      path: 'specialist-manager', component: SpecialistManagerComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'create-admin', component: CreateAdminComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'create-diary', component: CreateDiaryComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
