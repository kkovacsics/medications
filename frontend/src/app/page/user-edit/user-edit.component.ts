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

  item: User = new User()
  serverError = ''
  columns = this.config.userColumns
  title = 'Felhasználó'
  selectOptions1: ISelectOption[] = []

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

    this.selectOptions1 = this.getSelectOptions()

    this.activatedRoute.params.subscribe( params=> {
      const colPassword = this.columns.find(col => col.key === 'password')
      if (params.id === '0') {
        this.item = new User()
        if (colPassword) {
          colPassword.required = true // új felhasználónál kötelező
        }
      } else {
        if (colPassword) {
          colPassword.required = false // szerkesztésnél NEM kötelező
        }
        this.userService.get(params.id).subscribe( item => {
          this.item = item as User
          this.item.password = ''
        })
      }
    })

  }

  onSubmit(ngForm: NgForm): void {
    let observ$
    if (!this.item.password) { // ha nem adott meg semmit, meghagyjuk a régit
      delete this.item.password
    }
    if (this.item._id === '') {
      this.item._id = this.userService.mongoObjectId()
      observ$ = this.userService.create(this.item)
    } else {
      observ$ = this.userService.update(this.item)
    }
    observ$.toPromise().then(
      item => history.back(),
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
    let select = this.columns.find(item => item.type === 'select1')
    return select?.selectOpts1? select.selectOpts1: []
  }

}
