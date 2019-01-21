import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMinutes'
})
export class FormatMinutesPipe implements PipeTransform {

  transform(mins: number): any {
    let h: any = Math.floor(mins / 60);
    let m: any = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    if ( h === '00' ) {
      return `${m} minutes`; }
    return `${h} hours  ${m} minutes`;
  }

}
