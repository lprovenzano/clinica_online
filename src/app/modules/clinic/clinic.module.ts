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
import {CreateDiaryComponent} from "../../components/clinic/clinic/specialist/create-diary/create-diary.component";
import {ShiftpatientPipe} from "../../shared/pipes/shiftpatient.pipe";
import {ShiftspecialtyPipe} from "../../shared/pipes/shiftspecialty.pipe";
import {PatientShiftListComponent} from "../../components/clinic/clinic/patient/patient-shift-list/patient-shift-list.component";
import {PatientShiftRequestComponent} from "../../components/clinic/clinic/patient/patient-shift-request/patient-shift-request.component";
import {PatientShiftSelectedComponent} from "../../components/clinic/clinic/patient/patient-shift-selected/patient-shift-selected.component";
import {PatientShiftRequestListComponent} from "../../components/clinic/clinic/patient/patient-shift-request-list/patient-shift-request-list.component";
import {PatientViewPipe} from "../../shared/pipes/patient-view.pipe";
import {ShiftstatusPipe} from "../../shared/pipes/shiftstatus.pipe";


@NgModule({
  declarations: [ClinicComponent, CreateAdminComponent, CreateDiaryComponent, SpecialistManagerComponent, ListDiaryComponent, ListShiftComponent, ShiftpatientPipe,
    ShiftspecialtyPipe, PatientShiftListComponent, PatientShiftRequestComponent, PatientShiftSelectedComponent, PatientShiftRequestListComponent, PatientViewPipe, ShiftstatusPipe
  ],
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
