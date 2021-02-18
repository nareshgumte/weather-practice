import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public weatherItes$: Observable<any>;
  constructor(
    private weatherService: WeatherService
  ) {
    this.weatherItes$ = this.weatherService.getEuropeanCities();
  }

  ngOnInit(): void {

  }

}
