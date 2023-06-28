import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistoryService } from 'src/app/shared/services/history.service';
import { UserprofileService } from 'src/app/shared/services/userprofile.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit, OnDestroy {
  user:any;
  additionalInfo:any;
  subscriber?:Subscription;
  public history:any[] = []

  constructor(public userProfile: UserprofileService,
    private historyService: HistoryService) {
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }

  ngOnInit(): void {
    this.user = this.userProfile.getLoggedProfile;
    this.subscriber = this.historyService.get('history')
          .subscribe((data: any) =>
          {
           let historyUser = data.filter((x:any) => {
                              const doctorId = JSON.parse(JSON.parse(data[0].diary).doctor).idNumber
                              return doctorId == this.user.idNumber
                            });
            this.history = historyUser;
          });
  }

  getKeys(){
    return Object.keys(this.history)
  }

  getValueFromKey(key:any){
    return this.history[key];
  }

  getPatient(index:any){
    const history = JSON.parse(this.history[index].history)
    const patient = JSON.parse(history.patient)
    return patient;
  }

  getHistory(index:any){
    return JSON.parse(this.history[index].history)
  }

  getAdditionalInformation(index:any){
    const history = JSON.parse(this.history[index].history)
    const info = JSON.parse(history.additionalInformation)
    let values = []
    for (const key in info) {
      if (info.hasOwnProperty(key)) {
        const value = info[key];
        values.push(`${key}: ${value}`);
      }
    }
    return values
  }

}
