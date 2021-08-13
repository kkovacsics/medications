import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/service/statistic.service';
import { Statistic } from 'src/app/model/statistic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statistic: Statistic = new Statistic()
  statistic$: Subscription = this.statisticService.statistic$.subscribe(
    statistic => this.statistic = statistic
  )

  constructor(
    private statisticService: StatisticService,
  ) { }

  ngOnInit(): void {
    this.statisticService.get()
  }

}
