import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../app/entidades/usuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { Disponibilidad } from '../../app/clases/disponibilidad';
import { Datosusuario } from '../../app/entidades/datosusuario';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { FiltromedicoPipe } from "../../app/pipe/filtromedico.pipe";
import { TurnosusadosPipe } from "../../app/pipe/turnosusados.pipe";

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FiltromedicoPipe, TurnosusadosPipe],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {
  public usuario:Usuario = {id_usuario:0, nombre:'', password:'', apellido:'', user:'', mail:'', tipo_usuario:0, nacimiento: new Date(), dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0 };
  public medicos:Usuario [] = [];
  public disponibilidad:Disponibilidad [] = [];
  public turnosusados:Array<Disponibilidad> = [];
  public filtroEspecialidad: string = '';
  public decode:Datosusuario = {data: {id_usuario: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), user:'', password: '', tipo_usuario: 0, autorizado:true}}

  

  constructor(private usuarioservices:UsuarioService) {
    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);

    this.usuarioservices.GetDisponibilidadMedicos(this.medicos).subscribe(
      x=> {
    
          if((<Usuario[]>x).length >=1){
              console.log("Se han encontrado medicos/admins");
              console.log("Medicos/admins encontrados:", x); // Verificar datos recibidos
              this.medicos = Object.assign([], x);
              this.sacarUsados(); //reemplazar por sacar usados cuando esté codeado XD
          }

          
    });
 
  }

  public sacarUsados(){
    this.usuarioservices.LeerTurnosTomados(this.turnosusados).subscribe(
      x=> {
        if((<Disponibilidad[]>x).length >=1){
          console.log("Se han encontrado turnos usados");
          this.turnosusados = Object.assign([], x);
          this.buscarDisponibilidad();
      }
        
      });
  }

  public formatDateForMySQL(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Añadir cero a la izquierda si es necesario
    const day = ('0' + date.getDate()).slice(-2);
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


  public buscarDisponibilidad(){
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    const hoy = new Date();

    for (let i = 0; i < 14; i++) {
        const diaActual = new Date();
        diaActual.setDate(hoy.getDate() + i);
        diaActual.setHours(0, 0, 0, 0); // Establecer la hora en 00:00:00
        const diaSemanaIndex = (diaActual.getDay() + 6) % 7; // Convertir el índice del día (0-6) para empezar con lunes en 0

        if (diaSemanaIndex >= 5) {
            continue; // Si es sábado o domingo, continuamos al siguiente día
        }

        this.medicos.forEach(medico => {
            if (medico.dias_habiles && medico.dias_habiles[diaSemanaIndex]) {
                const desde = medico.horario_desde ?? 0; // Default a 0 si es undefined
                const hasta = medico.horario_hasta ?? 24; // Default a 24 si es undefined

                for (let hora = desde; hora < hasta; hora++) {

                    this.disponibilidad.push({
                         id_usuario: this.decode.data.id_usuario,
                        id_medico: medico.id_medico,
                        nombre: medico.nombre,
                        apellido: medico.apellido,
                        especialidad: medico.especialidad,
                        fecha: this.formatDateForMySQL(new Date(diaActual)), // Convertir fecha al formato MySQL
                        hora: hora,
                        estado: "Pendiente"
                    });
                }
            }
        });
    }

    console.log('Disponibilidad final:', this.disponibilidad);
    return this.disponibilidad;
}

public tomarTurno(turno: Disponibilidad){
    // console.log('Índice:', index);
    console.log('Longitud del array disponibilidad:', this.disponibilidad.length);


  // let turnoTomado = this.disponibilidad[index];

  console.log('Turno tomado:', turno);


         this.usuarioservices.NuevoTurno(turno).subscribe(
             x=>{

                alert("Turno tomado correctamente");

             }
         );
}
}
