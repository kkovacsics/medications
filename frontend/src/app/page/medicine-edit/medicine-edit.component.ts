import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/model/medicine';
import { ConfigService, ISelectOption } from 'src/app/service/config.service';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
  selector: 'app-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: ['./medicine-edit.component.scss']
})
export class MedicineEditComponent implements OnInit {

  item: Medicine = new Medicine()
  serverError = ''
  columns = this.config.medicineColumns
  title = 'Gyógyszer'

  constructor(
    private config: ConfigService,
    private medicineService: MedicineService,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params=> {
      if (params.id === '0') {
        this.item = new Medicine()
      } else {
        this.medicineService.get(params.id).subscribe( item => {
          this.item = item as unknown as Medicine
          this.item.password = ''
        })
      }
    })
  }

  onSubmit(ngForm: NgForm): void {
    let observ$
    if (this.item._id === '0') {
      this.item._id = this.medicineService.mongoObjectId()
      observ$ = this.medicineService.create(this.item)
    } else {
      observ$ = this.medicineService.update(this.item)
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
