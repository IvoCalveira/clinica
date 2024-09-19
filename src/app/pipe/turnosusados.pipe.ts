import { Pipe, PipeTransform } from '@angular/core';
import { Disponibilidad } from '../clases/disponibilidad';

@Pipe({
  name: 'turnosusados',
  standalone: true
})
export class TurnosusadosPipe implements PipeTransform {

  transform(value: Disponibilidad[], usados: Disponibilidad[]): Disponibilidad[] {

    if (!value || !usados) {
      return value; // Si no hay valores o usados, devolver la lista original
    }

    // console.log("Filtrando disponibilidad:", value);
    // console.log("Con turnos usados:", usados);

    const resultado = value.filter(t => !usados.some(q =>
      new Date(q.fecha).toISOString().slice(0, 10) === new Date(t.fecha).toISOString().slice(0, 10) &&
      q.hora === t.hora &&
      q.id_medico === t.id_medico
    ));

    // console.log("Disponibilidad después del filtrado:", result);
    return resultado;
  }

}
