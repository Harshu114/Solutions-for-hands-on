import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  pure: true
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1) return 'Less than a month';
    if (value === 1) return '1 month';
    return `${value} months`;
  }
}