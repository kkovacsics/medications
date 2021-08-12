import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Medication } from 'src/app/model/medication';
import { Medicine } from 'src/app/model/medicine';
import { Resident } from 'src/app/model/resident';
import { Stock } from 'src/app/model/stock';
import { ConfigService } from 'src/app/service/config.service';
import { MedicationService } from 'src/app/service/medication.service';
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
  medications: Medication[] = []

  constructor(
    private config: ConfigService,
    private stockService: StockService,
    private medicationService: MedicationService,
  ) { }

  ngOnInit(): void {
  }

  getStocks(): Observable<Stock[]> {
    return this.medicationService.get()
      .pipe(tap(items => this.medications = items))
      .pipe(switchMap(() => this.stockService.get()))
      .pipe(tap(items => this.getMedicationPeriod(items)))
  }

  delete(item: Stock) {
    this.stockService.delete(item).subscribe(
      () => this.list$ = this.getStocks()
    )
  }

  getMedicationPeriod(stocks: Stock[]) {
    stocks.forEach( stock => {
      let medicat = this.medications.find(
        medication => stock.residentId === medication.residentId && stock.medicineId === medication.medicineId
      ) || new Medication()
      
      stock.period = (stock.pills / (medicat.morning + medicat.afternoon + medicat.evening) / 7).toFixed(2)
      stock.period = stock.period === 'Infinity'? '': stock.period
    }
    )
  }

}
