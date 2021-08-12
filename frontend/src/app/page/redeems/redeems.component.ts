import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Medication } from 'src/app/model/medication';
import { Medicine } from 'src/app/model/medicine';
import { Resident } from 'src/app/model/resident';
import { Stock } from 'src/app/model/stock';
import { ConfigService } from 'src/app/service/config.service';
import { MedicationService } from 'src/app/service/medication.service';
import { MedicineService } from 'src/app/service/medicine.service';
import { ResidentService } from 'src/app/service/resident.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-redeems',
  templateUrl: './redeems.component.html',
  styleUrls: ['./redeems.component.scss']
})
export class RedeemsComponent implements OnInit {

  columns = this.config.redeemsColumns
  title = 'Gyógyszer kiváltás (4 heti adag)'
  list$: Observable<Medication[]> = this.getMedications()
  week = 1

  residents: Resident[] = []
  medicines: Medicine[] = []
  stocks: Stock[] = []
  medications: Medication[] = []
  filtered: Medication[] = []

  phrase = ''
  sortKey = 'residentName'
  sortAscending = true

  constructor(
    private config: ConfigService,
    private medicationService: MedicationService,
    private residentService: ResidentService,
    private medicineService: MedicineService,
    private stockService: StockService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getMedications(): Observable<Medication[]> {
    return this.residentService.get()
      .pipe( tap( items => this.residents = items ) )
      .pipe( switchMap( () => this.medicineService.get() ) )
      .pipe( tap( items => this.medicines = items ) )
      .pipe( switchMap( () => this.stockService.get() ) )
      .pipe( tap( items => this.stocks = items ) )
      .pipe( switchMap( () => this.medicationService.get() ) )
      .pipe( tap( items => {
          items.forEach( item => {
            const residentName = this.residents.find( resident => item.residentId===resident._id )?.name
            item.residentName = residentName? residentName: ''
            const medicineName = this.medicines.find( medicine => item.medicineId===medicine._id )?.name
            item.medicineName = medicineName? medicineName: ''
            const stock = this.stocks.find(stock => item.residentId === stock.residentId &&
                                                    item.medicineId === stock.medicineId) || new Stock()
            item.stockId = stock._id || ''
            item.stock = stock.pills || 0
            this.getMonthlyDose(item)
          })
          this.medications = items
          this.filtered = items.filter(item => (item.stock || 0)<(item.morning + item.afternoon + item.evening) * this.week * 7 )
        })
      )
      .pipe( switchMap( () => of(this.filtered) ) )
  }

  getMonthlyDose(medication: Medication): void {
    const packing = this.medicines.find(medicine => medicine._id === medication.medicineId)?.packing || 0
    const montlyDose = (medication.morning + medication.afternoon + medication.evening) * 28
    const boxes = Math.ceil(montlyDose / packing)
    medication.boxes = boxes
    medication.pills = boxes * packing
  }

  onWeekChanged(): void {
    this.filtered = this.medications.filter(item => (item.stock || 0) < (item.morning + item.afternoon + item.evening) * this.week * 7)
    this.list$ = of(this.filtered)
  }

  onSave(): void {
    this.saveItem(0)
  }

  async saveItem(id: number): Promise<void> {
    const medication = this.filtered[id]
    const stock = new Stock()
    stock._id = medication.stockId || ''
    stock.residentId = medication.residentId
    stock.medicineId = medication.medicineId
    stock.pills = (medication.stock || 0) + (medication.pills || 0)
    stock.recipes = 0
    delete stock.residentName
    delete stock.medicineName
    delete stock.period

    let item
    if (stock._id === '') {
      stock._id = this.stockService.mongoObjectId()
      item = await this.stockService.create(stock).toPromise()
    } else {
      item= await this.stockService.update(stock).toPromise()
    }
 
    medication.stock = item.pills
    // this.onWeekChanged()

    if (++id < this.filtered.length) {
      this.saveItem(id)
    } else {
      this.router.navigate(['/'])  
    }
  }

  onColumnClick(key: string): void {
    if (this.sortKey === key) {
      this.sortAscending = !this.sortAscending
    } else {
      this.sortKey = key
      this.sortAscending = true
    }
  }

}
