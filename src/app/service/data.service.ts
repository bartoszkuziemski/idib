import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RawData} from "../model/raw-data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // static readonly ROOT_URL = 'http://localhost:8080/data';
  static readonly ROOT_URL = 'api/data';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) {
  }

  getFullData(): Observable<RawData[]> {
    const url = DataService.ROOT_URL;
    return this.http.get<RawData[]>(url, this.httpOptions);
  }

}
