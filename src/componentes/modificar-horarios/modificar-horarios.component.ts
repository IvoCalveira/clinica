import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../app/entidades/usuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-modificar-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './modificar-horarios.component.html',
  styleUrl: './modificar-horarios.component.css'
})
export class ModificarHorariosComponent {
  
  public usuario: Usuario = {
    id_usuario: 0, nombre: '', password: '', apellido: '', user: '', mail: '', tipo_usuario: 0,
    nacimiento: new Date(), dias_habiles: Array(5).fill(false),  // Aseguramos que siempre sea un array de booleanos
    especialidad: '', foto_especialidad: '', foto_perfil: '', horario_desde: 0, horario_hasta: 0,
    autorizado: true, id_medico: 0
  };
  
  diasSeleccionados: boolean[] = Array(5).fill(false);  // Array de booleanos para gestionar la selección en el frontend
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  constructor(private usuarioservices: UsuarioService, private route: Router) {
    const token = localStorage.getItem('UsuarioToken');
    if (token) {
      this.usuario = jwtDecode<any>(token);
      
      // Asegurarse de que 'dias_habiles' no sea undefined, en caso de que no esté en el token
      this.usuario.dias_habiles = this.usuario.dias_habiles || Array(5).fill(false); // Default to all false if undefined
      
      // Iniciar 'diasSeleccionados' desde 'dias_habiles' si ya se han cargado días antes
      this.diasSeleccionados = [...this.usuario.dias_habiles];
    }
  }

  // Actualizar el array de booleanos cuando el usuario selecciona o deselecciona un día
  booleanoDias(index: number, event: any) {
    this.diasSeleccionados[index] = event.target.checked;  // Actualizar el valor booleano
    this.cargarDias();  // Cargar los días en 'dias_habiles'
  }

  // Actualizar 'dias_habiles' en el usuario con los valores de 'diasSeleccionados'
  cargarDias() {
    this.usuario.dias_habiles = this.diasSeleccionados;
  }

  cambiarHorario() {
    this.usuario.dias_habiles = this.diasSeleccionados;
    

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
}
