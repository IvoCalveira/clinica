import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../app/entidades/usuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { Datosusuario } from '../../app/entidades/datosusuario';
import { PasstocsvService } from '../../app/servicios/passtocsv.service';
import { Disponibilidad } from '../../app/clases/disponibilidad';

@Component({
  selector: 'app-modificar-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './modificar-horarios.component.html',
  styleUrl: './modificar-horarios.component.css'
})
export class ModificarHorariosComponent {
  public turnos:Disponibilidad[] = [];
  public usuario: Datosusuario = { data : {
    id_usuario: 0, nombre: '', password: '', apellido: '', user: '', mail: '', tipo_usuario: 0,
    nacimiento: new Date(), dias_habiles: Array(5).fill(false),  // Aseguramos que siempre sea un array de booleanos
    especialidad: '', foto_especialidad: '', foto_perfil: '', horario_desde: 0, horario_hasta: 0,
    autorizado: true, id_medico: 0}
  };
  
  diasSeleccionados: boolean[] = Array(5).fill(false);  // Array de booleanos para gestionar la selección en el frontend
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  constructor(private usuarioservices: UsuarioService, private route: Router, private csv:PasstocsvService) {
    const token = localStorage.getItem('UsuarioToken');
    if (token) {
      this.usuario = jwtDecode<any>(token);
      
      
      this.usuario.data.dias_habiles = this.usuario.data.dias_habiles || Array(5).fill(false); 
      
      
      this.diasSeleccionados = [...this.usuario.data.dias_habiles];
    }
  }

  
  booleanoDias(index: number, event: any) {
    this.diasSeleccionados[index] = event.target.checked;  
    this.cargarDias();  // Cargar los días en 'dias_habiles'
  }


  cargarDias() {
    this.usuario.data.dias_habiles = this.diasSeleccionados;
  }

  cambiarHorario() {
    this.usuario.data.dias_habiles = this.diasSeleccionados;
    
    console.log("usuario antes de api", this.usuario)
    this.usuarioservices.modificarHorario(this.usuario).subscribe(

      x => {
        if (x == null) {
          alert("No se ha podido modificar");
        } else {
          alert("Modificación hecha correctamente");
          console.log("Usuario modificado", this.usuario);
        }
      }
    );
  }

  descargarCSV(){
    this.usuarioservices.LeerTurnosMedico(this.usuario).subscribe(
      x=> {
        if(x && (<Disponibilidad[]>x)?.length >=1){
          console.log("Se han encontrado turnos", x);
          this.turnos = Object.assign([], x);
          this.csv.listaturnos(this.turnos);
      } else {
        alert("No se encontraron turnos pendientes");
        this.route.navigateByUrl('/bienvenido');
        console.log("Se han encontrado turnos", this.turnos);
      }});
      
  }
    
}

