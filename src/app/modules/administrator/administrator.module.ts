import { MetricsComponent } from './../../components/clinic/administrator/metrics/metrics.component';
import { UsersComponent } from './../../components/clinic/administrator/users/users.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { SpecialistManagerComponent } from 'src/app/components/clinic/administrator/specialist-manager/specialist-manager.component';
import { CreateAdminComponent } from 'src/app/components/clinic/administrator/create-admin/create-admin.component';


@NgModule({
  declarations: [
    SpecialistManagerComponent,
    CreateAdminComponent,
    UsersComponent,
    MetricsComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdministratorModule { }
