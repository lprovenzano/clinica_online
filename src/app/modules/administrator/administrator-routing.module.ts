import { UsersComponent } from './../../components/clinic/administrator/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdminComponent } from 'src/app/components/clinic/administrator/create-admin/create-admin.component';
import { SpecialistManagerComponent } from 'src/app/components/clinic/administrator/specialist-manager/specialist-manager.component';
import { AdminGuard } from 'src/app/shared/guard/admin.guard';

const routes: Routes = [{
  path:'',
  children:[
    {
      path: 'specialist-manager', component: SpecialistManagerComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'create-admin', component: CreateAdminComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'users', component: UsersComponent,
      canActivate: [AdminGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
