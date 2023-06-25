import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "../../components/page/home/home.component";
import {ImagestorageService} from "../../shared/services/imagestorage.service";
import { AuthModule } from '../auth/auth.module';
import { ClinicModule } from '../clinic/clinic.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ClinicModule,
    AuthModule,
    SharedModule
  ],
  providers:[ImagestorageService]
})
export class HomeModule { }
