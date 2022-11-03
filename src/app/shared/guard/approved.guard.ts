import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserprofileService} from "../services/userprofile.service";

@Injectable({
  providedIn: 'root'
})
export class ApprovedGuard implements CanActivate {
  constructor(
    public userProfile: UserprofileService,
    public router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedUser = JSON.parse(localStorage.getItem('user-profile')!);
    return loggedUser.approved;
  }

}
