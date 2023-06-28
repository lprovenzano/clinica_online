import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { CreateDiaryComponent } from 'src/app/components/clinic/clinic/specialist/create-diary/create-diary.component';
import { PatientHistoryComponent } from 'src/app/components/clinic/clinic/specialist/patient-history/patient-history.component';


@NgModule({
  declarations: [CreateDiaryComponent, PatientHistoryComponent],
  imports: [
    CommonModule,
    SpecialistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpecialistModule { }
