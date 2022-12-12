import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {RawData} from "../model/raw-data";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe
  ) {
  }

  chartData: RawData[] = [];
  chartDates: (string | null)[] = [];
  chartTemperature: number[] = [];
  chartLight: number[] = [];

  basicData: any;
  basicOptions: any;

  calendarDate: Date | undefined;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getFullData().subscribe({
      next: data => {
        this.chartData = data;
        this.setAllData();
      }
    })
  }

  setAllData(): void {
    this.setDates();
    this.setValues();
    this.setChart();
  }

  setDates(): void {
    const timestampDateFrom = this.chartData[0].date;
    const timestampDateTo = this.chartData[this.chartData.length - 1].date;
    const timeDifference = Math.abs(timestampDateTo - timestampDateFrom);
    const dates = this.chartData.map(data => new Date(data.date * 1000));
    if (timeDifference < 86400) { // less than 24 hours
      this.chartDates = dates.map(date => {
        return this.datePipe.transform(date, 'HH:mm', 'UTC', 'pl');
      });
    } else if (timeDifference >= 86400 && timeDifference < 432000) { // between 24 hours and 120 hours
      this.chartDates = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM, HH:mm');
      });
    } else if (timeDifference >= 432000 && timeDifference < 10368000) { // between 120 hours and 2880 hours
      this.chartDates = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM, HH:00');
      });
    } else if (timeDifference >= 10368000 && timeDifference < 31556926) { // between 2880 hours (120 days) and 1 year
      this.chartDates = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM');
      });
    }
    else {
      this.chartDates = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM.yy');
      });
    }

  }

  setValues(): void {
    this.chartTemperature = this.chartData.map(data => data.temperature);
    this.chartLight = this.chartData.map(data => data.light);
  }

  setChart(): void {
    this.basicData = {
      labels: this.chartDates,
      datasets: [
        {
          label: 'Light intensity',
          data: this.chartTemperature,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }

  onClose() {
    console.log(this.calendarDate)
  }
}
