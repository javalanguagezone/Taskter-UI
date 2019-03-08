import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBillable'
})
export class FromatBillable implements PipeTransform {

  transform(billable: boolean): any {
    return billable? 'Billable' : 'Non-Billable';
  }

}
