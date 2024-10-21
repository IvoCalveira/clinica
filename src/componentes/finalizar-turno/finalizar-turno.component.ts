import { Component } from '@angular/core';
import { Disponibilidad } from '../../app/clases/disponibilidad';
import { Datosusuario } from '../../app/entidades/datosusuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-finalizar-turno',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './finalizar-turno.component.html',
  styleUrl: './finalizar-turno.component.css'
})
export class FinalizarTurnoComponent {

  public turnos:Disponibilidad[] = [];
  public decode:Datosusuario = {data: {id_usuario: 0, id_medico: 0, nombre: '',apellido:'', mail:'', nacimiento: new Date(), user:'', password: '', tipo_usuario: 0, autorizado:true}};
  
  constructor(private usuarioservices:UsuarioService, private route:Router){

    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);


    this.usuarioservices.LeerTurnosFinalizados(this.decode).subscribe(
      x=> {
        if((x && <Disponibilidad[]>x)?.length >=1){
          console.log("Se han encontrado turnos", x);
          this.turnos = x;
      } else {
        console.log("turnos", this.turnos);
        alert("No se encontraron turnos pendientes");
        this.route.navigateByUrl('/bienvenido');
      }});

  }

    public FinalizarTurno(turno: Disponibilidad){
      console.log("Turno Finalizado", turno);
      this.usuarioservices.FinalizarTurnoApi(turno).subscribe(
        x=>{
           alert("Turno finalizado correctamente!");
        }
    );
    }

}
