import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {Data} from "../model/data";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) {
  }

  fullData: Data[] = [];
  data: Data[] = [];
  dates: string[] = [];
  values: number[] = [];

  basicData: any;
  basicOptions: any;

  calendarDate: Date | undefined;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getFullData().subscribe({
      next: data => {
        this.data = data;
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
    this.dates = this.data.map(data => data.date);
  }

  setValues(): void {
    this.values = this.data.map(data => data.value);
  }

  setChart(): void {
    this.basicData = {
      labels: this.dates,
      datasets: [
        {
          label: 'Light intensity',
          data: this.values,
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
