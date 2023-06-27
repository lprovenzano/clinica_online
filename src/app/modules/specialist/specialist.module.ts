import { SharedModule } from './../shared/shared.module';
import { SpinnerComponent } from 'src/app/components/utils/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { CreateDiaryComponent } from 'src/app/components/clinic/clinic/specialist/create-diary/create-diary.component';


@NgModule({
  declarations: [CreateDiaryComponent],
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
