import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDiaryComponent } from 'src/app/components/clinic/clinic/specialist/create-diary/create-diary.component';
import { PatientHistoryComponent } from 'src/app/components/clinic/clinic/specialist/patient-history/patient-history.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-diary', component: CreateDiaryComponent
      },
      {
        path: 'patient-history', component: PatientHistoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
