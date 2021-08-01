import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(arr: any, key: string, asc: boolean): any[] {
    if(!Array.isArray(arr) || !key){
      return arr;
    }

    return arr.sort((a, b) => {
      [a, b] = asc? [a, b]: [b, a];
      return  typeof a[key]==='number' && typeof b[key]==='number'?
              a[key]-b[key]:
              String(a[key]).toLowerCase().localeCompare(String(b[key]).toLowerCase());
    });
  }

}
