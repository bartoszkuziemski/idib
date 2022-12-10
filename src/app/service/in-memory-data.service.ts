import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Data} from "../model/data";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const data: Data[] = [
      {date: '01.01.2022', value: 170},
      {date: '02.01.2022', value: 254},
      {date: '03.01.2022', value: 312},
      {date: '04.01.2022', value: 133},
      {date: '05.01.2022', value: 35},
      {date: '06.01.2022', value: 342},
      {date: '07.01.2022', value: 189},
      {date: '08.01.2022', value: 56},
    ]
    return {data};
  }
}
