import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Medication } from 'src/app/model/medication';
import { ConfigService } from 'src/app/service/config.service';
import { RedeemService } from 'src/app/service/redeem.service';

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

  phrase = ''
  sortKey = 'residentName'
  sortAscending = true

  constructor(
    private config: ConfigService,
    private redeemService: RedeemService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getMedications(): Observable<Medication[]> {
    return this.redeemService.get()
  }

  onSave(): void {
    this.redeemService.update({ week: this.week }).subscribe(
      response => this.router.navigate(['/']),
      err => console.log(`Error: ${JSON.stringify(err.error.message)}`)
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
