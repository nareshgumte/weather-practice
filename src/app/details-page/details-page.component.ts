import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  public nextCoupleOfDaysReports$: Observable<any>;
  displayedColumns: string[] = ['date','temperature', 'sea_level'];

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.nextCoupleOfDaysReports$ = this.weatherService.noOfDaysReport(this.route.snapshot.params.name).pipe(
      map((res) => res.noOfDays)
    );
  }

  ngOnInit(): void {
  }

}
