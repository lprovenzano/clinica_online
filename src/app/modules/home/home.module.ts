import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "../../components/page/home/home.component";
import {AuthModule} from "../auth/auth.module";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
  ],
  providers:[]
})
export class HomeModule { }
