import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends {[propname: string]: any}> implements OnInit {

  @Input() columns: ITableColumn[] = []
  @Input() title: string = ''
  @Input() list$: Observable<T[]> | null = null
  @Input() entity: string = ''

  @Output() deleteEvent = new EventEmitter()

  phrase = ''
  @Input() sortKey = ''
  sortAscending = true

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  onDelete(item: any): void {
    if (confirm('Valóban törölni akarod?')) {
      this.phrase = ''
      this.sortKey = ''
      this.sortAscending = true
      this.deleteEvent.emit(item)
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
