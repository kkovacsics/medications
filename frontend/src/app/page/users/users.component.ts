import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  tableColumns = this.config.userColumns
  title = 'Felhasználók'
  list$: Observable<User[]> = this.userService.get()

  constructor(
    private config: ConfigService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
