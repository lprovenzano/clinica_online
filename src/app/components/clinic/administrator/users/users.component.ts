import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { HistoryService } from 'src/app/shared/services/history.service';
import debounce from 'lodash-es/debounce'
import _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  subscriber?:Subscription;
  history:any[] = []

  constructor(private historyService:HistoryService) { }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }

  ngOnInit(): void {
    this.subscriber = this.historyService.get('history')
          .subscribe((data: any) =>
          {
            data.map((x:any) => {
              const patient = JSON.parse(JSON.parse(x.history).patient).idNumber;
              if(this.history[patient]===undefined){
                this.history[patient] = [x]
              }else{
                this.history[patient].push(x)
              }
            })
            console.log(this.history)
          });
  }

  getKeys(){
    return Object.keys(this.history)
  }

  getValueFromKey(key:any){
    return this.history[key];
  }

  downloadCsv(data:any, filename:any) {
    const csvContent = this.convertToCsv(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  }

  convertToCsv(data:any) {
    const parsedData = this.parseAttributes(data);
    const keys = Object.keys(parsedData[0]);

    let csv = keys.join(',') + '\n';

    for (const item of parsedData) {
      const row = keys.map((key) => this.escapeCsvValue(item[key]));
      csv += row.join(',') + '\n';
    }

    return csv;
  }

  parseAttributes(data:any) {
    return data.map((item: { diary: string; history: string; }) => {
      const parsedItem = { ...item };

      parsedItem.diary = JSON.parse(item.diary);
      parsedItem.history = JSON.parse(item.history);

      return parsedItem;
    });
  }

  escapeCsvValue(value: string) {
    if (typeof value === 'string') {
      value = value.replace(/"/g, '""');
      if (value.includes(',') || value.includes('\n') || value.includes('"')) {
        value = `"${value}"`;
      }
    }
    return value;
  }

}
