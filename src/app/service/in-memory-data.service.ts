import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {RawData} from "../model/raw-data";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private readonly numberOfSamples = 200;

  constructor() {
  }

  createDb() {
    // const data: RawData[] = this.getRandomData(7200); // 2 hours period
    // const data: RawData[] = this.getRandomData(172800); // 2 days
    const data: RawData[] = this.getRandomData(2629743); // 1 month
    return {data};
  }

  getRandomData(periodInSeconds: number): RawData[] {
    let data: RawData[] = [];
    const startDate = 1670702400;
    for (let date = startDate; date < startDate + periodInSeconds; date += periodInSeconds / this.numberOfSamples) {
      const temperature = Math.random() * 30;
      const light = Math.floor(Math.random() * 1000);
      const rawData = new RawData(temperature, light, date);
      data.push(rawData);
    }
    return data;
  }

}
