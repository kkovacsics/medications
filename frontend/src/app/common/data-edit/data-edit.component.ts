import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Resident } from 'src/app/model/resident';
import { User } from 'src/app/model/user';
import { ISelectOption, ITableColumn } from 'src/app/service/config.service';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.scss']
})
export class DataEditComponent implements OnInit {

  @Input() item: User | Resident = new User()
  @Input() columns: ITableColumn[] = []
  @Input() title: string = ''
  @Input() serverError: string = ''
  @Input() selectOptions1: ISelectOption[] = []
  @Input() selectOptions2: ISelectOption[] = []

  @Output() submitEvent = new EventEmitter()


  constructor(

  ) { }

  ngOnInit(): void {
  }

  onSubmit(ngForm: NgForm): void {
    this.submitEvent.emit(ngForm)
  }
}
