import { Pipe, PipeTransform } from '@angular/core';
import { ITableColumn } from '../service/config.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any, columns: ITableColumn[], filter: string): any {
    if(!Array.isArray(arr) || !filter){
      return arr
    }

    filter = filter.toLowerCase()
    return arr.filter(item => {
      let result = false
      columns.forEach(col => {
        if (String(item[col.key]).toLowerCase().includes(filter)) {
          result = true
        }
      })
      return result
    })
  }

}
