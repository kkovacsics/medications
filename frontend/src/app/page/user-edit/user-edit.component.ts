import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { ConfigService, ISelectOption, ITableColumn } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  serverError = ''
  editColumns = this.config.userColumns
  title = 'Felhasználó'
  selectOptions: ISelectOption[] = []

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params
    //   .pipe(
    //     tap(param => {
    //       if (param.id === '0') {
    //         this.user = new User()
    //         return
    //       }
    //     })
    //   ).pipe(
    //     switchMap(param => this.userService.get(param.id)))
    //   .pipe(take(1))
    //   .subscribe(user => {
    //     this.user = user as User
    //     this.user.password = ''
    //   })

    this.selectOptions = this.getSelectOptions()
    
    this.activatedRoute.params.subscribe( params=> {
      if (params.id === '0') {
        this.user = new User()
      } else {
        this.userService.get(params.id).subscribe( user => {
          this.user = user as User
          this.user.password = ''
        })
      }
    })

  }

  onSubmit(ngForm: NgForm): void {
    let observ$
    if (!this.user.password) { // ha nem adott meg semmit, meghagyjuk a régit
      delete this.user.password
    }
    if (this.user._id === '0') {
      this.user._id = this.userService.mongoObjectId()
      observ$ = this.userService.create(this.user)
    } else {
      observ$ = this.userService.update(this.user)
    }
    observ$.toPromise().then(
        user => history.back(),
        err => {
          this.serverError = err.error
          const to = setTimeout( () => {
            clearTimeout(to)
            this.serverError = ''
          }, 3000)
        }
      )
  }

  getSelectOptions = (): ISelectOption[] => {
    let select = this.editColumns.find(item => item.type === 'select')
    if (!select) {
      return [] 
    }
    return select.selectOpt? select.selectOpt: []
  }

}
