import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Resident } from 'src/app/model/resident';
import { ISelectOption, ConfigService } from 'src/app/service/config.service';
import { ResidentService } from 'src/app/service/resident.service';

@Component({
  selector: 'app-resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.scss']
})
export class ResidentEditComponent implements OnInit {

  item: Resident = new Resident()
  serverError = ''
  columns = this.config.residentColumns
  title = 'Lakó'

  constructor(
    private config: ConfigService,
    private residentService: ResidentService,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params=> {
      if (params.id === '0') {
        this.item = new Resident()
      } else {
        this.residentService.get(params.id).subscribe( item => {
          this.item = item as unknown as Resident
          this.item.password = ''
        })
      }
    })
  }

  onSubmit(ngForm: NgForm): void {
    let observ$
    if (this.item._id === '0') {
      this.item._id = this.residentService.mongoObjectId()
      observ$ = this.residentService.create(this.item)
    } else {
      observ$ = this.residentService.update(this.item)
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

}
