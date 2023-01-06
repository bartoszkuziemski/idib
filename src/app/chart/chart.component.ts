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

  rawData: RawData[] = [];
  timeData: (string | null)[] = [];
  temperatureData: number[] = [];
  temperatureOutData: number[] = [];
  humidityData: number[] = [];
  humidityOutData: number[] = [];
  lightData: number[] = [];

  temperatureChart: any;
  humidityChart: any;
  lightChart: any;

  calendarDateFrom: Date = new Date(Date.now() - (86400 * 1000));
  calendarDateTo: Date = new Date(Date.now());

  error: boolean = false;
  noData: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getFullData(this.calendarDateFrom, this.calendarDateTo).subscribe({
      next: data => {
        this.error = false;
        if (data.length != 0) {
          this.setAllData(data);
          this.noData = false;
        } else {
          this.noData = true;
        }
      },
      error: () => this.error = true
    })
  }

  setAllData(data: RawData[]): void {
    this.rawData = data.sort((a, b) => a.date - b.date);
    this.setDates();
    this.setValues();
    this.setChart();
  }

  setDates(): void {
    const timestampDateFrom = this.rawData[0].date;
    const timestampDateTo = this.rawData[this.rawData.length - 1].date;
    const timeDifference = Math.abs(timestampDateTo - timestampDateFrom);
    const dates = this.rawData.map(data => new Date(data.date * 1000));
    if (timeDifference < 86400) { // less than 24 hours
      this.timeData = dates.map(date => {
        return this.datePipe.transform(date, 'HH:mm');
      });
    } else if (timeDifference >= 86400 && timeDifference < 432000) { // between 24 hours and 120 hours
      this.timeData = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM, HH:mm');
      });
    } else if (timeDifference >= 432000 && timeDifference < 10368000) { // between 120 hours and 2880 hours
      this.timeData = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM, HH:00');
      });
    } else if (timeDifference >= 10368000 && timeDifference < 31556926) { // between 2880 hours (120 days) and 1 year
      this.timeData = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM');
      });
    } else {
      this.timeData = dates.map(date => {
        return this.datePipe.transform(date, 'dd.MM.yy');
      });
    }

  }

  setValues(): void {
    this.temperatureData = this.rawData.map(data => data.temperature);
    this.temperatureOutData = this.rawData.map(data => data.temperature_out);
    this.humidityData = this.rawData.map(data => data.humidity);
    this.humidityOutData = this.rawData.map(data => data.humidity_out);
    this.lightData = this.rawData.map(data => data.light);
  }

  setChart(): void {
    this.temperatureChart = {
      labels: this.timeData,
      datasets: [
        {
          label: 'Temperature inside',
          data: this.temperatureData,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Temperature outside',
          data: this.temperatureOutData,
          fill: false,
          borderColor: '#42f566',
          tension: .4
        }
      ]
    };

    this.humidityChart = {
      labels: this.timeData,
      datasets: [
        {
          label: 'Humidity inside',
          data: this.humidityData,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Humidity outside',
          data: this.humidityOutData,
          fill: false,
          borderColor: '#42f566',
          tension: .4
        }
      ]
    };

    this.lightChart = {
      labels: this.timeData,
      datasets: [
        {
          label: 'Light intensity',
          data: this.lightData,
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };
  }

  onClose() {
    this.getData();
  }

}
