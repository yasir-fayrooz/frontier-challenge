import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'datePipe' })
export class DatePipe implements PipeTransform {
  transform(date: string): string {
    //set the createdAt field to relative time
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  }
}
