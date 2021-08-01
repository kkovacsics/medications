import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Medicine } from 'src/app/model/medicine';
import { Resident } from 'src/app/model/resident';
import { Stock } from 'src/app/model/stock';
import { ConfigService } from 'src/app/service/config.service';
import { MedicineService } from 'src/app/service/medicine.service';
import { ResidentService } from 'src/app/service/resident.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  tableColumns = this.config.stockColumns
  title = 'Készletek'
  entity = 'stock'
  list$: Observable<Stock[]> = this.getStocks()

  residents: Resident[] = []
  medicines: Medicine[] = []

  constructor(
    private config: ConfigService,
    private stockService: StockService,
    private residentService: ResidentService,
    private medicineService: MedicineService,
 ) { }

  ngOnInit(): void {
  }

  getStocks(): Observable<Stock[]> {
    return this.residentService.get()
      .pipe( tap( items => this.residents = items ) )
      .pipe( switchMap( () => this.medicineService.get() ) )
      .pipe( tap( items => this.medicines = items ) )
      .pipe( switchMap( () => this.stockService.get() ) )
      .pipe( tap( items => {
          items.forEach( item => {
            const residentName = this.residents.find( resident => item.residentId===resident._id )?.name
            item.resident = residentName? residentName: ''
            const medicineName = this.medicines.find( medicine => item.medicineId===medicine._id )?.name
            item.medicine = medicineName? medicineName: ''
          } )
        })
      )
  }

  delete(item: Stock) {
    this.stockService.delete(item).subscribe(
      () => this.list$ = this.getStocks()
    )
  }
}
