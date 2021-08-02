export class Medication {
  [key: string]: any;
  _id: string = '0';
  residentId: string = '0';
  medicineId: string = '0';
  morning: number = 0;
  afternoon: number = 0;
  evening: number = 0;
  resident?: string = '';
  medicine?: string = '';
}