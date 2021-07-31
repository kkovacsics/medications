import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User()
  serverError = ''

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (!this.user.email?.includes('@')) {
      this.user.email += '@gmail.com'
    }
    this.auth.login(this.user).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/'])
        }
      },
      err => {
        this.serverError = err.error;
        const to = setTimeout( () => {
          clearTimeout(to);
          this.serverError = '';
        }, 3000);

      }
    )
  }

  setPassword(): void {
    this.userService.update({ _id: "610526d682e725d54b1f0b62", password: 'test' })
      .subscribe(resp=> console.log(resp))
  }
}
