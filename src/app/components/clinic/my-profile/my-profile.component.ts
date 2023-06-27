import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { History } from './../../../shared/class/history';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, toArray } from 'rxjs';
import { HistoryService } from 'src/app/shared/services/history.service';
import {UserprofileService} from "../../../shared/services/userprofile.service";
import moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  user:any;
  subscriber?:Subscription;
  history:any[] = []


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
                              const history = JSON.parse(x.history)
                              const patient = JSON.parse(history.patient)
                              return patient.id == this.user.id
                            });
            this.history = historyUser;
          });
  }

  getHistoryTitle(history:any){
    const date = JSON.parse(history.history).date
    const specialty = JSON.parse(history.diary)
    return 'Fecha: ' + moment(date).format('DD-MM-YYYY HH:mm') + 'hs. | ' + 'Especialidad: ' + specialty.specialty
  }

  createPDF(){
    const pdfDefinition: any = {
      footer: {
        columns: [
          { text: 'Fecha emisión: ' + moment().format('DD-MM-YYYY'), alignment: 'right' }
        ]
      },
      content: [
        {
          svg: '<?xml version="1.0" ?><svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><circle cx="48" cy="48" r="46" style="fill:#eaeaea"/><path d="M48,2c-1.35,0-2.68.07-4,.18a46,46,0,0,1,0,91.63c1.32.11,2.65.18,4,.18A46,46,0,0,0,48,2Z" style="fill:#bacece"/><circle cx="48" cy="48" r="46" style="fill:none;stroke:#281a3b;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"/><path d="M57,58H71.63A3.38,3.38,0,0,0,75,54.63V43.38A3.38,3.38,0,0,0,71.63,40H57V25.38A3.38,3.38,0,0,0,53.63,22H42.38A3.38,3.38,0,0,0,39,25.38V40H24.37A3.38,3.38,0,0,0,21,43.38V54.63A3.38,3.38,0,0,0,24.37,58H39V72.63A3.38,3.38,0,0,0,42.37,76H53.62A3.38,3.38,0,0,0,57,72.63Z" style="fill:#575072"/><path d="M57,58H71.63A3.38,3.38,0,0,0,75,54.63V43.38A3.38,3.38,0,0,0,71.63,40H57V25.38A3.38,3.38,0,0,0,53.63,22H42.38A3.38,3.38,0,0,0,39,25.38V40H24.37A3.38,3.38,0,0,0,21,43.38V54.63A3.38,3.38,0,0,0,24.37,58H39V72.63A3.38,3.38,0,0,0,42.37,76H53.62A3.38,3.38,0,0,0,57,72.63Z" style="fill:#f47c6d"/><path d="M57,58H71.63A3.38,3.38,0,0,0,75,54.63V43.38A3.38,3.38,0,0,0,71.63,40H57V25.38A3.38,3.38,0,0,0,53.63,22H42.38A3.38,3.38,0,0,0,39,25.38V40H24.37A3.38,3.38,0,0,0,21,43.38V54.63A3.38,3.38,0,0,0,24.37,58H39V72.63A3.38,3.38,0,0,0,42.37,76H53.62A3.38,3.38,0,0,0,57,72.63Z" style="fill:none;stroke:#281a3b;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"/></svg>'
        },
        { text: 'Historia clínica', fontSize: 15 },
        {
          text:'\n------------------------------------------------------------------------------------------------------------------------------------'
        },
        {
          table: {
            headerRows: 1,
            width: ['auto', 'auto'],
            body: [
              ['Paciente', 'Fecha', 'Especialidad', 'Doctor', 'Diagnostico', 'Comentarios'],
              ...this.history.map(h =>
                  [JSON.parse(JSON.parse(h.history).patient).idNumber,
                    moment(JSON.parse(h.history).date).format('DD-MM-YYYY HH:mm') + 'hs.',
                  JSON.parse(h.diary).specialty,
                  JSON.parse(JSON.parse(h.diary).doctor).firstName + ' ' + JSON.parse(JSON.parse(h.diary).doctor).lastName,
                  h.diagnostic, JSON.parse(h.history).additionalInformation]
              )
            ]
          }
        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }
}

