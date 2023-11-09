import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolES'
})
export class BoolESPipe implements PipeTransform {

  transform(value: boolean, ): string {
    return value ? 'Si' : 'No';
  }

}
