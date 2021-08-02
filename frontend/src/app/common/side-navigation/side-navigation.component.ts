import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
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

  constructor(
    private config: ConfigService,
    private auth: AuthService,
  ) { }
  

  ngOnInit(): void {
  }

}
