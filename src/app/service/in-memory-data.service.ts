import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {RawData} from "../model/raw-data";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const data: RawData[] = [
      {date: 1670695150, value: 170},
      {date: 1670695250, value: 254},
      {date: 1670695350, value: 312},
      {date: 1670695450, value: 133},
      {date: 1670695550, value: 35},
      {date: 1670695650, value: 342},
      {date: 1670695750, value: 189},
      {date: 1670695850, value: 56},
    ]
    return {data};
  }
}
