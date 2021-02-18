import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { WeatherService } from "../services/weather.service";

@Component({
	selector: "app-home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
	public weatherItes$!: Observable<any>;
	public loader = true;
	constructor(private weatherService: WeatherService) {
		this.loader = true;
	}

	ngOnInit(): void {
		this.weatherItes$ = this.weatherService.getEuropeanCities().pipe(
			tap(() => {
				this.loader = false;
			})
		);
	}
}
