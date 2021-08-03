import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  selector: 'app-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.scss']
})
export class PillsComponent implements OnInit {

  columns = this.config.medicationColumns
  title = 'Gyógyszer kiosztás (1 heti adag)'
  list$: Observable<Medication[]> = this.getMedications()

  residents: Resident[] = []
  medicines: Medicine[] = []
  stocks: Stock[] = []
  medications: Medication[] = []

  phrase = ''
  sortKey = 'resident'
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
            item.resident = residentName? residentName: ''
            const medicineName = this.medicines.find( medicine => item.medicineId===medicine._id )?.name
            item.medicine = medicineName? medicineName: ''
            const stock = this.stocks.find(stock => item.residenId === stock.residenId &&
                                                    item.medicineId === stock.medicineId) || new Stock()
            item.stockId = stock._id || ''
            item.stock = stock.medicines || 0
            this.getWeeklyDose(item)
          })
          this.medications = items
        })
      )
  }

  getWeeklyDose(medication: Medication): void {
    const weeklyDose = (medication.morning + medication.afternoon + medication.evening) * 7
    medication.pills = weeklyDose
  }

  onSave(): void {
    this.saveItem(0)
  }

  async saveItem(id: number): Promise<void> {
    const medication = this.medications[id]
    const stock = new Stock()
    stock._id = medication.stockId || ''
    stock.residentId = medication.residentId
    stock.medicineId = medication.medicineId
    stock.medicines = (medication.stock || 0) - (medication.pills || 0)
    stock.recipes = 0
    delete (stock.resident)
    delete (stock.medicine)
    delete (stock.period)

    const item = await this.stockService.update(stock).toPromise()
    medication.stock = item.medicines
    
    if (++id < this.medications.length) {
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
