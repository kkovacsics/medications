import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
  type?: string;
  required?: boolean;
  selectOpts1?: any[];
  selectOpts2?: any[];
  pattern?: string;
  error?: string;
  onlyList?: boolean;
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

  navList: {label: string, href: string, icon: string, role: number}[] = [
    {label: 'Lakók', href: '/residents', icon: 'fas fa-user-friends fa-fw', role: 1},
    {label: 'Gyógyszerek', href: '/medicines', icon: 'fas fa-file-medical fa-fw', role: 1},
    {label: 'Gyógyszerezés', href: '/medications', icon: 'fas fa-hand-holding-medical fa-fw', role: 2},
    {label: 'Gyógyszerkészlet', href: '/stocks', icon: 'fas fa-prescription-bottle-alt fa-fw', role: 1},
    {label: 'Felhasználók', href: '/users', icon: 'fas fa-user fa-fw', role: 2},
  ];
  navAction: {label: string, href: string, icon: string, role: number}[] = [
    {label: 'Gyógyszer kiváltás', href: '/redeems', icon: 'fas fa-file-prescription fa-fw', role: 1},
    {label: 'Gyógyszer kiosztás', href: '/pills', icon: 'fas fa-pills fa-fw', role: 1},
  ];

  userColumns: ITableColumn[] = [
    {key: 'name', title: 'Név', type: 'text', required: true, pattern: "[A-ZÁÉÍÓÖŐÚÜŰ].{2,}", error: "Kötelező, nagy kezdőbetű, minimum 3 karakter!"},
    {key: 'email', title: 'Email', type: 'email', required: true, pattern:"[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}", error:"Kötelező, érvényes email cím!"},
    {key: 'password', title: 'Jelszó', type: 'password', pattern:".{4,}", error: "Minimum 4 karakter!"},
    {key: 'role', title: 'Szint', type: 'select1', selectOpts1: [{k:'1', v:'1'},{k:'2', v:'2'}] },
  ];

  residentColumns: ITableColumn[] = [
    {key: 'name', title: 'Név', type: 'text', required: true, pattern: "[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]{2,}\\s[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]{2,}.*", error: "Kötelező, legalább 2 tag, nagy kezdőbetű, minimum 3 karakter!"},
    {key: 'mother', title: 'Anyja neve', type: 'text', required: true, pattern: "[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]{2,}\\s[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]{2,}.*", error: "Kötelező, legalább 2 tag, nagy kezdőbetű, minimum 3 karakter!"},
    {key: 'dob', title: 'Szül.dátum', type: 'text', required: true, pattern: "(19|20)\\d{2}\\.(0[123456789]|1[012])\\.(0[123456789]|[12]\\d|3[01])", error: "Kötelező, dátum, éééé.hh.nn formában!"},
    // {key: 'dop', title: 'Szül.hely', type: 'text', required: true, pattern: "[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]{2,}", error: "Kötelező, nagy kezdőbetű, minimum 3 karakter!"},
    {key: 'sin', title: 'TAJ szám', type: 'text', required: true, pattern: "(\\d{3} ){2}\\d{3}", error: "Kötelező, 9 számjegy, hármasával tagolva, pl: 123 456 789!"},
    {key: 'movin', title: 'Beköltözés', type: 'text', required: true, pattern: "(19|20)\\d{2}\\.(0[123456789]|1[012])\\.(0[123456789]|[12]\\d|3[01])", error: "Kötelező, dátum, éééé.hh.nn formában!"},
    {key: 'movout', title: 'Kiköltözés', type: 'text', pattern: "(19|20)\\d{2}\\.(0[123456789]|1[012])\\.(0[123456789]|[12]\\d|3[01])", error: "Dátum, éééé.hh.nn formában!"},
  ];

  medicineColumns: ITableColumn[] = [
    {key: 'name', title: 'Gyógyszer', type: 'text', required: true, pattern: "[A-ZÁÉÍÓÖŐÚÜŰ].{2,}", error: "Kötelező, nagy kezdőbetű, minimum 3 karakter!"},
    {key: 'agent', title: 'Hatóanyag', type: 'text', pattern:"[a-záéíóöőúüű]{3,}", error:"Kisbetű, minimum 3 karakter!"},
    {key: 'packing', title: 'Kiszerelés', type: 'text', required: true, pattern:"\\d+", error: "Kötelező, szám!"},
  ];

  medicationColumns: ITableColumn[] = [
    {key: 'resident', title: 'Lakó', type: 'select1', required: true, error: "Kötelező!"},
    {key: 'medicine', title: 'Gyógyszer', type: 'select2', required: true, error: "Kötelező!"},
    {key: 'morning', title: 'Reggel', type: 'number', required: true, error: "Kötelező, szám!"},
    {key: 'afternoon', title: 'Délben', type: 'number', required: true, error: "Kötelező, szám!"},
    {key: 'evening', title: 'Este', type: 'number', required: true, error: "Kötelező, szám!"},
  ];

  stockColumns: ITableColumn[] = [
    {key: 'resident', title: 'Lakó', type: 'select1', required: true, error: "Kötelező!"},
    {key: 'medicine', title: 'Gyógyszer', type: 'select2', required: true, error: "Kötelező!"},
    {key: 'medicines', title: 'Gyógyszer[db]', type: 'number', required: true, error: "Kötelező, szám!"},
    {key: 'period', title: 'Ellátás[hét]', type: 'text', onlyList: true},
  ];

  redeemsColumns: ITableColumn[] = [
    {key: 'resident', title: 'Lakó', type: 'select1', required: true, error: "Kötelező!"},
    {key: 'medicine', title: 'Gyógyszer', type: 'select2', required: true, error: "Kötelező!"},
    {key: 'boxes', title: 'Doboz [db]', type: 'number', required: true, error: "Kötelező, szám!"},
    {key: 'pills', title: 'Tabletta [db]', type: 'number', required: true, error: "Kötelező, szám!"},
   ];

  constructor() { }
}
