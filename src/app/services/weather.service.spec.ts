import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
	let service: WeatherService;
	const getMethodSubject = new Subject();
	const httpClientMock = {
		get: jasmine.createSpy('get').and.returnValue(getMethodSubject.asObservable())
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				WeatherService,
				{
					provide: HttpClient,
					useValue: httpClientMock
				}
			]
		});
		service = TestBed.inject(WeatherService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getEuropeanCities', () => {
		it('should return getEuropeanCities list', (done) => {
			const getEuropeanCitiesMockData = {
				"message": "accurate",
				"cod": "200",
				"count": 5,
				"list": [
					{
						"id": 2643743,
						"name": "London",
						"coord": {
							"lat": 51.5085,
							"lon": -0.1257
						},
						"main": {
							"temp": 282.1,
							"feels_like": 277.19,
							"temp_min": 281.48,
							"temp_max": 283.15,
							"pressure": 1000,
							"humidity": 81
						},
						"dt": 1613650180,
						"wind": {
							"speed": 5.66,
							"deg": 240
						},
						"sys": {
							"country": "GB"
						},
						"rain": null,
						"snow": null,
						"clouds": {
							"all": 75
						},
						"weather": [
							{
								"id": 803,
								"main": "Clouds",
								"description": "broken clouds",
								"icon": "04d"
							}
						]
					},
					{
						"id": 2634341,
						"name": "City of Westminster",
						"coord": {
							"lat": 51.5,
							"lon": -0.1167
						},
						"main": {
							"temp": 282.1,
							"feels_like": 277.19,
							"temp_min": 281.48,
							"temp_max": 283.15,
							"pressure": 1000,
							"humidity": 81
						},
						"dt": 1613649979,
						"wind": {
							"speed": 5.66,
							"deg": 240
						},
						"sys": {
							"country": "GB"
						},
						"rain": null,
						"snow": null,
						"clouds": {
							"all": 75
						},
						"weather": [
							{
								"id": 803,
								"main": "Clouds",
								"description": "broken clouds",
								"icon": "04d"
							}
						]
					},
					{
						"id": 6545250,
						"name": "Lambeth",
						"coord": {
							"lat": 51.4963,
							"lon": -0.1115
						},
						"main": {
							"temp": 282.1,
							"feels_like": 277.19,
							"temp_min": 281.48,
							"temp_max": 283.15,
							"pressure": 1000,
							"humidity": 81
						},
						"dt": 1613650132,
						"wind": {
							"speed": 5.66,
							"deg": 240
						},
						"sys": {
							"country": "GB"
						},
						"rain": null,
						"snow": null,
						"clouds": {
							"all": 75
						},
						"weather": [
							{
								"id": 803,
								"main": "Clouds",
								"description": "broken clouds",
								"icon": "04d"
							}
						]
					},
					{
						"id": 6690574,
						"name": "Clerkenwell",
						"coord": {
							"lat": 51.5244,
							"lon": -0.1102
						},
						"main": {
							"temp": 282.11,
							"feels_like": 277.2,
							"temp_min": 281.48,
							"temp_max": 283.15,
							"pressure": 1000,
							"humidity": 81
						},
						"dt": 1613650140,
						"wind": {
							"speed": 5.66,
							"deg": 240
						},
						"sys": {
							"country": "GB"
						},
						"rain": null,
						"snow": null,
						"clouds": {
							"all": 75
						},
						"weather": [
							{
								"id": 803,
								"main": "Clouds",
								"description": "broken clouds",
								"icon": "04d"
							}
						]
					},
					{
						"id": 2643741,
						"name": "City of London",
						"coord": {
							"lat": 51.5128,
							"lon": -0.0918
						},
						"main": {
							"temp": 282.33,
							"feels_like": 277.47,
							"temp_min": 281.48,
							"temp_max": 283.71,
							"pressure": 1000,
							"humidity": 81
						},
						"dt": 1613650179,
						"wind": {
							"speed": 5.66,
							"deg": 240
						},
						"sys": {
							"country": "GB"
						},
						"rain": null,
						"snow": null,
						"clouds": {
							"all": 75
						},
						"weather": [
							{
								"id": 803,
								"main": "Clouds",
								"description": "broken clouds",
								"icon": "04d"
							}
						]
					}
				]
			};
			spyOn(service, 'getWeatherReport').and.returnValue(
				of({
					name: "City of London",
					temp: "8.74",
					sunrise: 1613632106000,
					sunset: 1613668826000
				})
			);
			service.getEuropeanCities().subscribe((data) => {
				console.log(data)
				expect(data).toEqual([
					{ name: 'City of London', temp: '8.74', sunrise: 1613632106000, sunset: 1613668826000 },
					{ name: 'City of London', temp: '8.74', sunrise: 1613632106000, sunset: 1613668826000 },
					{ name: 'City of London', temp: '8.74', sunrise: 1613632106000, sunset: 1613668826000 },
					{ name: 'City of London', temp: '8.74', sunrise: 1613632106000, sunset: 1613668826000 },
					{ name: 'City of London', temp: '8.74', sunrise: 1613632106000, sunset: 1613668826000 }
				])
				done();
			});
			getMethodSubject.next(getEuropeanCitiesMockData);
		});

	});

	describe('getWeatherReport', () => {
		it('should return the report list', (done) => {
			const responseData = {
				"coord": {
					"lon": -0.0918,
					"lat": 51.5128
				},
				"weather": [
					{
						"id": 803,
						"main": "Clouds",
						"description": "broken clouds",
						"icon": "04d"
					}
				],
				"base": "stations",
				"main": {
					"temp": 281.88,
					"feels_like": 275.66,
					"temp_min": 281.48,
					"temp_max": 282.59,
					"pressure": 1001,
					"humidity": 76
				},
				"visibility": 10000,
				"wind": {
					"speed": 7.2,
					"deg": 250
				},
				"clouds": {
					"all": 75
				},
				"dt": 1613653064,
				"sys": {
					"type": 1,
					"id": 1414,
					"country": "GB",
					"sunrise": 1613632106,
					"sunset": 1613668826
				},
				"timezone": 0,
				"id": 2643741,
				"name": "City of London",
				"cod": 200
			};
			service.getWeatherReport('London').subscribe((data) => {

				expect(data).toEqual(
					{
						name: 'City of London',
						temp: '8.73',
						sunrise: 1613632106000,
						sunset: 1613668826000
					}
				);

				done();
			});
			getMethodSubject.next(responseData)
		});
	});

	describe('noOfDaysReport', () => {
		it('should return the response', (done) => {
			const mockData = {
				"cod": "200",
				"message": 0,
				"cnt": 40,
				"list": [
					{
						"dt": 1613660400,
						"dt_txt": "2021-02-18 15:00:00",
						"main": {
							"temp": 282.65,
							"feels_like": 276.92,
							"temp_min": 282.65,
							"temp_max": 283.3,
							"pressure": 1002,
							"sea_level": 1002,
							"grnd_level": 1002,
							"humidity": 62,
							"temp_kf": -0.65
						},
						"weather": [
							{
								"id": 803,
								"main": "Clouds",
								"description": "broken clouds",
								"icon": "04d"
							}
						],
						"clouds": {
							"all": 62
						},
						"wind": {
							"speed": 5.94,
							"deg": 255
						},
						"visibility": 10000,
						"pop": 0.18,
						"sys": {
							"pod": "d"
						}

					}
				],
				"city": {
					"id": 2634341,
					"name": "London",
					"coord": {
						"lat": 51.5,
						"lon": -0.1167
					},
					"country": "GB",
					"population": 0,
					"timezone": 0,
					"sunrise": 1613632111,
					"sunset": 1613668834
				}
			};

			service.noOfDaysReport('London').subscribe((data: any) => {
				expect(data.city.name).toEqual('London')
				done();
			});
			getMethodSubject.next(mockData);
		});
	});
});
