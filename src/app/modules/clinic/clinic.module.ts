import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClinicRoutingModule} from './clinic-routing.module';
import {ClinicComponent} from "../../components/clinic/clinic/clinic.component";
import {CreateAdminComponent} from "../../components/clinic/administrator/create-admin/create-admin.component";
import {SpecialistManagerComponent} from "../../components/clinic/administrator/specialist-manager/specialist-manager.component";
import {ListDiaryComponent} from "../../components/clinic/clinic/specialist/list-diary/list-diary.component";
import {ListShiftComponent} from "../../components/clinic/clinic/specialist/list-shift/list-shift.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";


@NgModule({
  declarations: [ClinicComponent, CreateAdminComponent, SpecialistManagerComponent, ListDiaryComponent, ListShiftComponent],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ]
})
export class ClinicModule {
}
