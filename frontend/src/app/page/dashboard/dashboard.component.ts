import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Medication } from 'src/app/model/medication';
import { Stock } from 'src/app/model/stock';
import { StatisticService } from 'src/app/serice/statistic.service';
import { MedicationService } from 'src/app/service/medication.service';
import { ResidentService } from 'src/app/service/resident.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  residentNumber = 0
  medicationNumber = 0
  medicationPeriod = 0
  medications: Medication[] = []
  medication_uniqs: string[] = []
  stocks: Stock[] = []
  periodMoreThanOneWeek: boolean = false

  constructor(
    private residentService: ResidentService,
    private medicationService: MedicationService,
    private stockService: StockService,
    private statisticService: StatisticService,
  ) { }

  ngOnInit(): void {
    this.residentService.get()
      .pipe(tap(residents => this.residentNumber = residents.length))
      .pipe(switchMap(item => this.medicationService.get()))
      .pipe( tap(medications => this.medications = medications),
             tap(medications => this.medication_uniqs = [...new Set(medications.map(medication => medication.residentId))]),
             tap(medications => this.medicationNumber = this.medication_uniqs.length)
      )
      .pipe(switchMap(item => this.stockService.get()))
      .pipe(tap(stocks => this.stocks = stocks),
            tap(stocks => this.medicationPeriod = this.getMedicationPeriod()))
      .subscribe()
  }

  getMedicationPeriod(): number {
    this.medications.forEach(
      medication => medication.stock = this.stocks.find(
        stock => stock.residentId === medication.residentId && stock.medicineId === medication.medicineId)?.medicines || 0
    )
    let period = Infinity
     this.medications.forEach(medication => {
      if ((medication.stock || 0) / (medication.morning+medication.afternoon+medication.evening) < period) {
        period = (medication.stock || 0) / (medication.morning+medication.afternoon+medication.evening)
      }
    })
    this.periodMoreThanOneWeek = period / 7 >= 1
    this.statisticService.weeklyPeriod$.next(period/7)
    return period/7
  }
}
