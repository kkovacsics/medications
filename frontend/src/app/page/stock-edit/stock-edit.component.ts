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
      .pipe( tap(residents => this.selectOptions1 = this.fillOptionList(residents) ) )
      .pipe( switchMap( () => this.medicineService.get() ) )
      .pipe( tap(medicines => this.selectOptions2 = this.fillOptionList(medicines) ) )
      .pipe( tap( medicines => {
        this.activatedRoute.params.subscribe(params => {
          if (params.id === '0') {
            this.item = new Stock()
          } else {
            this.stockService.get(params.id).subscribe( item => {
              this.item = item as unknown as Stock
            })
          }
        })
      }))
      .subscribe()
  }

  onSubmit(ngForm: NgForm): void {
    let observ$
    
    if (this.item._id === '') {
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

  fillOptionList(options: { _id: string, name: string }[]): { k: string, v: string }[] {
    return options.map(option => ({ k: option._id, v: option.name }))
            .sort( (a,b) => a.v.toLowerCase().localeCompare(b.v.toLowerCase()) )
  }

}
