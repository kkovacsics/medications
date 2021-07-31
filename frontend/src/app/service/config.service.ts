import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
  hidden?: boolean;
  outputTransform?: any;
  htmlOutput?: any;
  pipes?: any[];
  pipeArgs?: any[][];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = `http://localhost:3000/`;

  navigation: {label: string, href: string, icon: string, role: number}[] = [
    {label: 'Lakók', href: '/resident', icon: 'fas fa-user-friends fa-fw', role: 1},
    {label: 'Gyógyszerek', href: '/medicine', icon: 'fas fa-file-medical fa-fw', role: 1},
    {label: 'Gyógyszerezés', href: '/medication', icon: 'fas fa-hand-holding-medical fa-fw', role: 2},
    {label: 'Felhasználók', href: '/users', icon: 'fas fa-user fa-fw', role: 2},
  ];

  userColumns: ITableColumn[] = [
    {key: 'id', title: '#'},
    {key: 'name', title: 'Név'},
    {key: 'email', title: 'Email'},
    {key: 'password', title: 'Jelszó'},
    {key: 'role', title: 'Szint'},
  ];

  residentColumns: ITableColumn[] = [
    {key: 'id', title: '#'},
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
