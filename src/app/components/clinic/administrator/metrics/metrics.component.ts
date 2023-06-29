import { map } from 'rxjs';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { LogService } from 'src/app/shared/services/log.service';
import moment from 'moment';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit, OnDestroy {

  public chart: any;
  public chartShifts: any;
  public chartShiftsDay:any;
  private userMetrics: any;
  private shiftsMetrics: any;
  private shiftsMetricsDay: any;
  private subscriber?:Subscription;
  private subscriber2?:Subscription;
  private subscriber3?:Subscription;

  constructor(private log:LogService) { }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
    this.subscriber2?.unsubscribe()
    this.subscriber3?.unsubscribe()
  }


  ngOnInit(): void {
    this.initUserMetrics();
    this.initShiftsMetrics();
    this.initShiftsDayMetrics();
  }

  createUserChart(){

    const groupedData: any[] = [];
    const groupedMap = new Map();

    this.userMetrics.forEach((obj:any) => {
      const { date, idNumber, user } = obj;

      const key = `${date}_${idNumber}`;
      if (groupedMap.has(key)) {
        groupedMap.get(key).users.push(user);
      } else {
        groupedMap.set(key, { date, users: [user] });
      }
    });

    groupedMap.forEach(value => {
      groupedData.push(value);
    });

    const labels = groupedData.map((x: any) => moment(x.date).format('yyyy-MM-dd HH:mm'));
    const data = groupedData.map((x: any) => x.users.length);

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Users",
            data: data,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createShiftChart(){
    // Obtener las etiquetas y los datos del array de objetos
    const labels = this.shiftsMetrics.map((obj:any) => obj.specialty);
    const dataValues = this.shiftsMetrics.map((obj:any) => obj.total);

    // Crear el gráfico de barras
    this.chartShifts = new Chart("MyChart2", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Turnos por especialidad",
            data: dataValues,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createShiftDaysChart(){
    const labels = this.shiftsMetrics.map((obj:any) => obj.day);
    const dataValues = this.shiftsMetrics.map((obj:any) => obj.total);

    this.chartShiftsDay = new Chart("MyChart3", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Turnos por día",
            data: dataValues,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  initUserMetrics(){
    this.subscriber = this.log.get('user-metrics').subscribe(
      x => {
            this.userMetrics = x;
            this.createUserChart();
      }
    )
  }

  initShiftsMetrics(){
    this.subscriber2 = this.log.get('shift-day-metrics').subscribe(
      x => {
        this.shiftsMetrics = x;
        this.createShiftChart();
      }
    )
  }

  initShiftsDayMetrics(){
    this.subscriber3 = this.log.get('shift-day-metrics').subscribe(
      x => {
        this.shiftsMetricsDay = x;
        this.createShiftDaysChart();
      }
    )
  }

}
