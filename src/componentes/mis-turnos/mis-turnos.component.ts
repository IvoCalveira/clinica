import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FiltromedicoPipe } from '../../app/pipe/filtromedico.pipe';
import { Disponibilidad } from '../../app/clases/disponibilidad';
import { Datosusuario } from '../../app/entidades/datosusuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { PasstocsvServiceService } from '../../app/servicios/passtocsv-service.service';
import { PasstocsvService } from '../../app/servicios/passtocsv.service';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FiltromedicoPipe, PasstocsvService],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})
export class MisTurnosComponent {

  public turnos:Disponibilidad[] = [];
  public decode:Datosusuario = {data: {id_usuario: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), user:'', password: '', tipo_usuario: 0, autorizado:true}};
  public filtroEspecialidad: string = '';


  constructor(private usuarioservices:UsuarioService, private route: Router,private dialog: Matdialog,private passtocsvService: PasstocsvService){

    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);

    console.log(this.decode);
    this.usuarioservices.LeerTurnosTomados(this.decode).subscribe(
      x=> {
        if((<Disponibilidad[]>x)?.length >=1){
          console.log("Se han encontrado turnos aceptado", x);
          this.turnos = Object.assign([], x);
      } else {
        alert("No se encontraron turnos aceptados");
        this.route.navigateByUrl('/bienvenida');
      }});

  }

  public Chat(turno:Disponibilidad){
    
  }
}
