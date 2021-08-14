import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekFilter'
})
export class WeekFilterPipe implements PipeTransform {

  transform(arr: any, week: number): any {
    if(!Array.isArray(arr) || !week){
      return arr
    }

    return arr.filter(
      item => (item.stock || 0) < (item.morning + item.afternoon + item.evening) * week * 7
    )
  }

}
