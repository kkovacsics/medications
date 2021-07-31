import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Resident } from 'src/app/model/resident';
import { ConfigService } from 'src/app/service/config.service';
import { ResidentService } from 'src/app/service/resident.service';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {

  tableColumns = this.config.residentColumns
  title = 'Lakók'
  list$: Observable<Resident[]> = this.residentService.get()

  constructor(
    private config: ConfigService,
    private residentService: ResidentService
  ) { }

  ngOnInit(): void {
  }

}