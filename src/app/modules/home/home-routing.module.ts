import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "../../components/page/auth/signup/signup.component";
import {LoginComponent} from "../../components/page/auth/login/login.component";
import {HomeComponent} from "../../components/page/home/home.component";

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '', component: HomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
