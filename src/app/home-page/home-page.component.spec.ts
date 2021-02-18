import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject } from 'rxjs';
import { WeatherService } from '../services/weather.service';

import { HomePageComponent } from './home-page.component';


const weatherData = [
	{
		"name": "London",
		"temp": "8.73",
		"sunrise": 1613632114000,
		"sunset": 1613668835000
	},
	{
		"name": "City of Westminster",
		"temp": "8.73",
		"sunrise": 1613632111000,
		"sunset": 1613668834000
	},
	{
		"name": "Lambeth",
		"temp": "8.73",
		"sunrise": 1613632109000,
		"sunset": 1613668833000
	},
	{
		"name": "Clerkenwell",
		"temp": "8.74",
		"sunrise": 1613632112000,
		"sunset": 1613668829000
	},
	{
		"name": "City of London",
		"temp": "8.91",
		"sunrise": 1613632106000,
		"sunset": 1613668826000
	}
];
describe('HomePageComponent', () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;
	const getEuropeanCitiesSubject = new Subject();
	const weatherServiceMock = {
		getEuropeanCities: jasmine.createSpy('getEuropeanCities').and.returnValue(getEuropeanCitiesSubject.asObservable())
	};
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomePageComponent],
			providers: [
				{
					provide: WeatherService,
					useValue: weatherServiceMock
				}
			],
			imports: [
				MatCardModule,
				HttpClientModule,
				MatProgressBarModule
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('weatherItes$', () => {
		it('should return weather list', (done) => {
			component.weatherItes$.subscribe(data => {
				expect(data).toEqual(weatherData);
				done();
			});
			getEuropeanCitiesSubject.next(weatherData);
		});
	});
});
