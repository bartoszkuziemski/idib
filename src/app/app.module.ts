import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ChartModule} from "primeng/chart";
import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChartComponent} from './chart/chart.component';
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {HttpClientModule} from "@angular/common/http";
import {InMemoryDataService} from "./service/in-memory-data.service";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    ToastModule,
    FormsModule,
    HttpClientModule,
    // remove when a real server is ready to receive requests
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
