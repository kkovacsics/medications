import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { Stock } from 'src/app/model/stock';
import { ISelectOption, ConfigService } from 'src/app/service/config.service';
import { MedicineService } from 'src/app/service/medicine.service';
import { ResidentService } from 'src/app/service/resident.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  item: Stock = new Stock()
  serverError = ''
  columns = this.config.stockColumns
  title = 'Gyógyszerkészlet'
  selectOptions1: ISelectOption[] = []
  selectOptions2: ISelectOption[] = []

  constructor(
    private config: ConfigService,
    private stockService: StockService,
    private residentService: ResidentService,
    private medicineService: MedicineService,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.residentService.get()
      .pipe( tap(residents => this.selectOptions1 = residents.map(resident => ({ k: resident._id, v: resident.name }))
                                                  .sort( (a,b) => a.v.toLowerCase().localeCompare(b.v.toLowerCase()) ) ) )
      .pipe( switchMap( () => this.medicineService.get() ) )
      .pipe( tap(medicines => this.selectOptions2 = medicines.map(medicine => ({ k: medicine._id, v: medicine.name }))
                                                  .sort( (a,b) => a.v.toLowerCase().localeCompare(b.v.toLowerCase()) ) ) )
      .pipe( tap( medicines => {
        this.activatedRoute.params.subscribe(params => {
          if (params.id === '0') {
            this.item = new Stock()
          } else {
            this.stockService.get(params.id).subscribe( item => {
              this.item = item as unknown as Stock
              this.item.residentName = this.item.residentId
              this.item.medicineName = this.item.medicineId
            })
          }
        })
      } )).subscribe()
  }

  onSubmit(ngForm: NgForm): void {
    let observ$
    this.item.residentId = this.item.residentName || ''
    this.item.medicineId = this.item.medicineName || ''
    delete(this.item.residentName)
    delete(this.item.medicineName)
    
    this.item.pills = Number(this.item.pills)
    this.item.recipes = Number(this.item.recipes)
    
    if (this.item._id === '0') {
      this.item._id = this.stockService.mongoObjectId()
      observ$ = this.stockService.create(this.item)
    } else {
      observ$ = this.stockService.update(this.item)
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
