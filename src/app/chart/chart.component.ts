import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  basicData: any;

  basicOptions: any;

  ngOnInit(): void {

    this.basicData = {
      labels: ['01.01.2022', '02.01.2022', '03.01.2022', '04.01.2022', '05.01.2022', '06.01.2022', '07.01.2022', '08.01.2022', '09.01.2022', '10.01.2022', '11.01.2022', '12.01.2022', '13.01.2022', '14.01.2022',
        '15.01.2022', '16.01.2022', '17.01.2022', '18.01.2022', '19.01.2022', '20.01.2022', '21.01.2022', '21.01.2022', '22.01.2022', '23.01.2022', '24.01.2022', '25.01.2022', '26.01.2022', '27.01.2022'],
      datasets: [
        {
          label: 'Light intensity',
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };

  }

}
