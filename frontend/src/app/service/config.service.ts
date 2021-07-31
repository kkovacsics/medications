import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
  type?: string;
  required?: boolean;
  selectOpt?: any[];
  pattern?: string;
  error?: string;
  pipeArgs?: any[][];
}

export interface ISelectOption {
  k: string
  v: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = `http://localhost:3000/`;

  navigation: {label: string, href: string, icon: string, role: number}[] = [
    {label: 'Lakók', href: '/residents', icon: 'fas fa-user-friends fa-fw', role: 1},
    {label: 'Gyógyszerek', href: '/medicines', icon: 'fas fa-file-medical fa-fw', role: 1},
    {label: 'Gyógyszerezés', href: '/medications', icon: 'fas fa-hand-holding-medical fa-fw', role: 2},
    {label: 'Felhasználók', href: '/users', icon: 'fas fa-user fa-fw', role: 2},
  ];

  userColumns: ITableColumn[] = [
    {key: 'name', title: 'Név', type: 'text', required: true, pattern: "[A-ZÁÉÍÓÖŐÚÜŰ].{2,}", error: "Kötelező, nagy kezdőbetű, minimum 3 karakter!"},
    {key: 'email', title: 'Email', type: 'email', required: true, pattern:"[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}", error:"Kötelező, érvényes email cím!"},
    {key: 'password', title: 'Jelszó', type: 'password', pattern:".{4,}", error: "Minimum 4 karakter!"},
    {key: 'role', title: 'Szint', type: 'select', selectOpt: [{k:'1', v:'1'},{k:'2', v:'2'}] },
  ];

  residentColumns: ITableColumn[] = [
    {key: 'name', title: 'Név'},
    {key: 'mother', title: 'Anyja neve'},
    {key: 'dob', title: 'Szül.dátum'},
    {key: 'dop', title: 'Szül.hely'},
    {key: 'sin', title: 'TAJ szám'},
    {key: 'movin', title: 'Beköltözés'},
    {key: 'movout', title: 'Kiköltözés'},
  ];

  constructor() { }
}
