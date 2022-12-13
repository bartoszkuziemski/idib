import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RawData} from "../model/raw-data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // static readonly ROOT_URL = 'http://localhost:8080/data';
  static readonly ROOT_URL = 'api/data';

  constructor(
    private http: HttpClient
  ) {
  }

  // getFullData(dateFrom: Date, dateTo: Date): Observable<RawData[]> {
  //   const url = DataService.ROOT_URL;
  //   const dateFromTimestamp = Math.floor(dateFrom.getTime() / 1000);
  //   const dateToTimestamp = Math.floor(dateTo.getTime() / 1000);
  //   return this.http.get<RawData[]>(url, {
  //     params: new HttpParams()
  //       .set('dateFrom', dateFromTimestamp)
  //       .set('dateTo', dateToTimestamp)
  //   });
  // }

  getFullData(dateFrom: Date, dateTo: Date): Observable<RawData[]> {
    const url = DataService.ROOT_URL;
    return this.http.get<RawData[]>(url);
  }

}
