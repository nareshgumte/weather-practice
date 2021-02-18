import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { WeatherService } from '../services/weather.service';

import { DetailsPageComponent } from './details-page.component';
const responseData = {
	"main": {
		"id": 2643743, "name": "London", "coord":
			{ "lat": 51.5085, "lon": -0.1257 }, "country": "GB", "population": 1000000, "timezone": 0, "sunrise": 1613632114, "sunset": 1613668835
	},
	"noOfDays":
		[
			{ "date": 1613682000, "dateString": "2021-02-18 21:00:00", "temperature": "6.75", "seaLevel": 1008 },
			{ "date": 1613768400, "dateString": "2021-02-19 21:00:00", "temperature": "9.84", "seaLevel": 1006 },
			{ "date": 1613854800, "dateString": "2021-02-20 21:00:00", "temperature": "12.04", "seaLevel": 1004 },
			{ "date": 1613941200, "dateString": "2021-02-21 21:00:00", "temperature": "9.90", "seaLevel": 1013 },
			{ "date": 1614027600, "dateString": "2021-02-22 21:00:00", "temperature": "9.18", "seaLevel": 1022 }
		]
};
describe('DetailsPageComponent', () => {
	let component: DetailsPageComponent;
	let fixture: ComponentFixture<DetailsPageComponent>;
	const activateRouteMock = {
		snapshot: { params: { name: 'London' } }
	};
	const noOfDaysReportSubject = new Subject();
	const weatherServiceMock = {
		noOfDaysReport: jasmine.createSpy('noOfDaysReport').and.returnValue(noOfDaysReportSubject.asObservable())
	};
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetailsPageComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: activateRouteMock
				},
				{
					provide: WeatherService,
					useValue: weatherServiceMock
				}
			],
			imports: [
				MatCardModule,
				MatTableModule,
				MatProgressBarModule
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DetailsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	describe('nextCoupleOfDaysReports$', () => {
		it('should return the noOfDays forecast report', (done) => {
			component.nextCoupleOfDaysReports$.subscribe((data) => {
				expect(data).toEqual(responseData.noOfDays);
				done();
			});
			noOfDaysReportSubject.next(
				responseData
			)
		});
	});
});
