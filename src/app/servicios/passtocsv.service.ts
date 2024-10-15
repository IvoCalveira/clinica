import { Injectable } from '@angular/core';
import { Disponibilidad } from '../clases/disponibilidad';

@Injectable({
  providedIn: 'root'
})
export class PasstocsvService {

  constructor() { }

  public listaturnos(turnos: Disponibilidad[]): void {
    const csvData = this.convertToCSV(turnos);
    this.downloadCSV(csvData);
  }

  private convertToCSV(turnos: Disponibilidad[]): string {
    const header = ['Nombre', 'Apellido', 'Hora', 'Fecha'];
    const rows = turnos.map(turno => [
      turno.nombre, 
      turno.apellido, 
      turno.hora, 
      this.formatDate(turno.fecha) // Formatear la fecha, manejando Date o string
    ]);

    // Convierte el array a CSV
    const csvContent = [
      header.join(';'), // Encabezados
      ...rows.map(e => e.join(';')) // Filas de datos
    ].join('\n');

    return csvContent;
  }

  private formatDate(fecha: Date | string): string {
    let date: Date;

    // Si es un string, intenta convertirlo a Date, si ya es Date, úsalo directamente
    if (typeof fecha === 'string') {
      date = new Date(fecha);
    } else {
      date = fecha;
    }

    const day = String(date.getDate()).padStart(2, '0'); // Día en formato DD
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en formato MM
    const year = date.getFullYear(); // Año en formato AAAA
    return `${day}-${month}-${year}`;
  }

  private downloadCSV(csvContent: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'turnos.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}