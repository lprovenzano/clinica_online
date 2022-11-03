import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "../../components/page/home/home.component";
import {AuthModule} from "../auth/auth.module";
import {ClinicModule} from "../clinic/clinic.module";
import {ImagestorageService} from "../../shared/services/imagestorage.service";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
    ClinicModule,
  ],
  providers:[ImagestorageService]
})
export class HomeModule { }
