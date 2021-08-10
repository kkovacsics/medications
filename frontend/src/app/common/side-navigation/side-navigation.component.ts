import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { StatisticService } from 'src/app/service/statistic.service';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  navList = this.config.navList
  navAction = this.config.navAction
  user$: BehaviorSubject<User | null> = this.auth.currentUserSubject$

  hasWeeklyDose: boolean = false
  period$: BehaviorSubject<number> = this.statisticService.weeklyPeriod$

  constructor(
    private config: ConfigService,
    private auth: AuthService,
    private statisticService: StatisticService,
  ) { }
  

  ngOnInit(): void {
    this.period$.subscribe(weeklyPeriod => this.hasWeeklyDose = weeklyPeriod>=1)
  }

}
