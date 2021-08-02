import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Medication } from 'src/app/model/medication';
import { Medicine } from 'src/app/model/medicine';
import { Resident } from 'src/app/model/resident';
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
  title = 'Gyógyszer kiosztás'
  list$: Observable<Medication[]> = this.getMedications()

  residents: Resident[] = []
  medicines: Medicine[] = []

  phrase = ''
  sortKey = ''
  sortAscending = false

  constructor(
    private config: ConfigService,
    private medicationService: MedicationService,
    private residentService: ResidentService,
    private medicineService: MedicineService,
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
  }

  getMedications(): Observable<Medication[]> {
    return this.residentService.get()
      .pipe( tap( items => this.residents = items ) )
      .pipe( switchMap( () => this.medicineService.get() ) )
      .pipe( tap( items => this.medicines = items ) )
      .pipe( switchMap( () => this.medicationService.get() ) )
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

  onColumnClick(key: string): void {
    if (this.sortKey === key) {
      this.sortAscending = !this.sortAscending
    } else {
      this.sortKey = key
      this.sortAscending = true
    }
  }

}
