import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDiaryComponent } from 'src/app/components/clinic/clinic/specialist/create-diary/create-diary.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-diary', component: CreateDiaryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
