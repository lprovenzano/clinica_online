import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "../../components/page/home/home.component";
import {AuthModule} from "../auth/auth.module";
import {ClinicModule} from "../clinic/clinic.module";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
    ClinicModule,
  ],
  providers:[]
})
export class HomeModule { }
