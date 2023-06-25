import { SpecialistModule } from './../specialist/specialist.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClinicRoutingModule} from './clinic-routing.module';
import {ClinicComponent} from "../../components/clinic/clinic/clinic.component";
import {ListDiaryComponent} from "../../components/clinic/clinic/specialist/list-diary/list-diary.component";
import {ListShiftComponent} from "../../components/clinic/clinic/specialist/list-shift/list-shift.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShiftspecialtyPipe} from "../../shared/pipes/shiftspecialty.pipe";
import {PatientShiftListComponent} from "../../components/clinic/clinic/patient/patient-shift-list/patient-shift-list.component";
import {PatientShiftRequestComponent} from "../../components/clinic/clinic/patient/patient-shift-request/patient-shift-request.component";
import {PatientShiftSelectedComponent} from "../../components/clinic/clinic/patient/patient-shift-selected/patient-shift-selected.component";
import {PatientShiftRequestListComponent} from "../../components/clinic/clinic/patient/patient-shift-request-list/patient-shift-request-list.component";
import {PatientViewPipe} from "../../shared/pipes/patient-view.pipe";
import {ShiftstatusPipe} from "../../shared/pipes/shiftstatus.pipe";
import {ShiftcolorPipe} from "../../shared/pipes/shiftcolor.pipe";
import {ShiftspecialtyspecialistPipe} from "../../shared/pipes/shiftspecialtyspecialist.pipe";
import {MyProfileComponent} from "../../components/clinic/my-profile/my-profile.component";
import { AdministratorModule } from '../administrator/administrator.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClinicComponent,
    ListDiaryComponent,
    ListShiftComponent,
    ShiftspecialtyPipe,
    PatientShiftListComponent,
    PatientShiftRequestComponent,
    PatientShiftSelectedComponent,
    PatientShiftRequestListComponent,
    PatientViewPipe,
    ShiftstatusPipe,
    ShiftcolorPipe,
    ShiftspecialtyspecialistPipe,
    MyProfileComponent,
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdministratorModule,
    SpecialistModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClinicModule {
}
