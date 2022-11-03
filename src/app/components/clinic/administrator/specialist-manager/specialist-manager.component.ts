import {Component, OnInit} from '@angular/core';
import {UserprofileService} from "../../../../shared/services/userprofile.service";
import {map, Observable} from "rxjs";
import {Userprofile} from "../../../../shared/class/userprofile";
import {Role} from "../../../../shared/enums/role";

@Component({
  selector: 'app-specialist-manager',
  templateUrl: './specialist-manager.component.html',
  styleUrls: ['./specialist-manager.component.scss']
})
export class SpecialistManagerComponent implements OnInit {

  specialistRequests: Observable<any> | undefined;
  specialistApprovals: Userprofile[] | undefined;

  constructor(private userProfile: UserprofileService) {
  }

  ngOnInit(): void {
    this.specialistRequests = this.userProfile.getAll().snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({...a.payload.doc.data(), id: a.payload.doc.id})))
      );
    this.specialistRequests.subscribe(x => {
      this.specialistApprovals = x
      this.specialistApprovals = this.specialistApprovals?.filter(x => x.role === Role.SPECIALIST)
    });
  }

  enableSpecialist(idNumber: any) {
    this.changeStatus(idNumber, true)
  }

  async disableSpecialist(idNumber: any) {
    this.changeStatus(idNumber, false)
  }

  private changeStatus(idNumber: any, value: boolean){
    this.userProfile.getByIdNumber(idNumber).then(x=>{
      let user: Userprofile = x;
      user.approved = value;
      this.userProfile.update(idNumber, user)
    })
  }
}
