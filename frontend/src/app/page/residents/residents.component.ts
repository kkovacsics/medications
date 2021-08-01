import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Resident } from 'src/app/model/resident';
import { ConfigService } from 'src/app/service/config.service';
import { ResidentService } from 'src/app/service/resident.service';

@Component({
  selector: 'app-resident',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  tableColumns = this.config.residentColumns
  title = 'Lakók'
  entity = 'resident'
  list$: Observable<Resident[]> = this.residentService.get()

  constructor(
    private config: ConfigService,
    private residentService: ResidentService
  ) { }

  ngOnInit(): void {
  }

  delete(item: Resident) {
    this.residentService.delete(item).subscribe(
      () => this.list$ = this.residentService.get()
    )
  }

}
