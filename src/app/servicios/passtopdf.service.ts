import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { Usuario } from '../entidades/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasstopdfService {



  constructor(private http: HttpClient) { }
listamedPDF1(medicos:Usuario[]) {
    const pdf = new jsPDF();

    // Agregar título
    pdf.setFontSize(22);
    pdf.text('Lista de Médicos', 20, 20);

    // Configuración de estilo de texto
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');

    // Generar la lista de médicos
    let yOffset = 40; // Margen superior inicial
    medicos.forEach((medico, index) => {
        pdf.text(`${index + 1}. ${medico.nombre} - ${medico.especialidad}`, 20, yOffset);
        yOffset += 10; // Aumenta la distancia vertical para la siguiente línea
    });

    // Guardar el PDF
  pdf.save('ListaMedicos.pdf');
}

listamedPDF(medicos: Usuario[]) {
  // Ruta al logo en assets
  const logo = 'assets/clinica.png';

  // Leer la imagen desde la ruta y convertirla en base64
  this.http.get(logo, { responseType: 'blob' }).subscribe((blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const logoDataUrl = reader.result as string;

      // Crear el documento PDF
      const doc = new jsPDF();

      // Agregar el logo al PDF
      doc.addImage(logoDataUrl, 'PNG', 10, 10, 50, 20); // Ajusta las posiciones y el tamaño del logo

      // Agregar título
      doc.setFontSize(22);
      doc.text('Lista de Médicos', 20, 40); // Ajusta la posición del título después del logo

      // Configuración de estilo de texto
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');

      // Generar la lista de médicos
      let yOffset = 60; // Ajusta la posición inicial después del título
      medicos.forEach((medico, index) => {
        doc.text(`${index + 1}. ${medico.nombre} - ${medico.especialidad}`, 20, yOffset);
        yOffset += 10; // Aumenta la distancia vertical para la siguiente línea
      });

      // Guardar el PDF
      doc.save('ListaMedicos.pdf');
    };
  });
}

}