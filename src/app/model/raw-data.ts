export class RawData {
  date: number;
  temperature: number;
  light: number;
  humidity: number;
  temperature_out: number;
  humidity_out: number;


  constructor(date: number, temperature: number, light: number, humidity: number, temperature_out: number, humidity_out: number) {
    this.date = date;
    this.temperature = temperature;
    this.light = light;
    this.humidity = humidity;
    this.temperature_out = temperature_out;
    this.humidity_out = humidity_out;
  }
}
