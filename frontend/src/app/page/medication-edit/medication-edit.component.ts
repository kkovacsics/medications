import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Medication } from 'src/app/model/medication';
import { ConfigService, ISelectOption } from 'src/app/service/config.service';
import { MedicationService } from 'src/app/service/medication.service';
import { MedicineService } from 'src/app/service/medicine.service';
import { ResidentService } from 'src/app/service/resident.service';

@Component({
  selector: 'app-medication-edit',
  templateUrl: './medication-edit.component.html',
  styleUrls: ['./medication-edit.component.scss']
})
export class MedicationEditComponent implements OnInit {

  item: Medication = new Medication()
  serverError = ''
  columns = this.config.medicationColumns
  title = 'Gyógyszerezés'
  selectOptions1: ISelectOption[] = []
  selectOptions2: ISelectOption[] = []

  constructor(
    private config: ConfigService,
    private medicationService: MedicationService,
    private residentService: ResidentService,
    private medicineService: MedicineService,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.residentService.get()
      .pipe( tap(residents => this.selectOptions1 = residents.map(resident => ({k: resident._id, v: resident.name}))
                                                  .sort( (a,b) => a.v.toLowerCase().localeCompare(b.v.toLowerCase()) ) ) )
      .pipe( switchMap( () => this.medicineService.get() ) )
      .pipe( tap( medicines => this.selectOptions2 = medicines.map(medicine => ({k: medicine._id, v: medicine.name}))
                                                  .sort( (a,b) => a.v.toLowerCase().localeCompare(b.v.toLowerCase()) ) ) )
      .pipe( tap( medicines => {
        this.activatedRoute.params.subscribe(params => {
          if (params.id === '0') {
            this.item = new Medication()
          } else {
            this.medicationService.get(params.id).subscribe( item => {
              this.item = item as unknown as Medication
              this.item.resident = this.item.residentId
              this.item.medicine = this.item.medicineId
            })
          }
        })
      } )).subscribe()
  }

  onSubmit(ngForm: NgForm): void {
    let observ$
    this.item.residentId = this.item.resident || ''
    this.item.medicineId = this.item.medicine || ''
    delete(this.item.resident)
    delete(this.item.medicine)
    
    this.item.morning = Number(this.item.morning)
    this.item.afternoon = Number(this.item.afternoon)
    this.item.evening = Number(this.item.evening)

    if (this.item._id === '0') {
      this.item._id = this.medicationService.mongoObjectId()
      observ$ = this.medicationService.create(this.item)
    } else {
      observ$ = this.medicationService.update(this.item)
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
    return select?.selectOpts1? select?.selectOpts1: []
  }

}
