import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horario'
})
export class HorarioPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
