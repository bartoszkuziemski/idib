export class RawData {
  temperature: number;
  light: number;
  date: number;

  constructor(temperature: number, light: number, date: number) {
    this.temperature = temperature;
    this.light = light;
    this.date = date;
  }
}
