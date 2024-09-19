import { Pipe, PipeTransform } from '@angular/core';
import { Disponibilidad } from '../clases/disponibilidad';

@Pipe({
  name: 'filtromedico',
  standalone: true
})
export class FiltromedicoPipe implements PipeTransform {

  transform(value: Array<Disponibilidad>, filtro: string): Array<Disponibilidad> {
    if (!filtro) {
      return value; // Si no hay filtro, devolver la lista original
    }

    filtro = filtro.toLowerCase(); // Convertir el filtro a minúsculas una vez

    return value.filter(t => t.especialidad && t.especialidad.toLowerCase().indexOf(filtro) > -1);
  }

}
