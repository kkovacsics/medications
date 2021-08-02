export class Stock {
  [key: string]: any;
  _id: string = '0';
  residentId: string = '0';
  medicineId: string = '0';
  medicines: number = 0;
  recipes?: number = 0;
  resident?: string = '';
  medicine?: string = '';
  period?: string = '';
}
