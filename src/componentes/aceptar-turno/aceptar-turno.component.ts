import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Disponibilidad } from '../../app/clases/disponibilidad';
import { Datosusuario } from '../../app/entidades/datosusuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-aceptar-turno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './aceptar-turno.component.html',
  styleUrl: './aceptar-turno.component.css'
})
export class AceptarTurnoComponent {

  public turnos:Disponibilidad[] = [];
  public decode:Datosusuario = {data: {id_usuario: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), user:'', password: '', tipo_usuario: 0, autorizado:true}};
  
    constructor(private usuarioservices:UsuarioService, private route:Router){

      const token = localStorage.getItem('UsuarioToken');
      this.decode = jwtDecode<any>(token!);


      this.usuarioservices.LeerTurnosMedico(this.decode).subscribe(
        x=> {
          if((<Disponibilidad[]>x)?.length >=1){
            console.log("Se han encontrado turnos", x);
            this.turnos = Object.assign([], x);
        } else {
          alert("No se encontraron turnos pendientes");
          this.route.navigateByUrl('/bienvenida');
        }});

    }

    public Aceptarturno(turno: Disponibilidad){
      console.log("Turno aceptado");
      this.usuarioservices.turnoAceptado(turno).subscribe(
        x=>{
           alert("Turno aceptado correctamente!");
        }
    );
    }

    public Rechazarturno(turno: Disponibilidad){
      console.log("Turno rechazado");
      this.usuarioservices.turnoRechazado(turno).subscribe(
        x=>{
           alert("Turno rechazado correctamente!");
        }
    );
      
    }
}
