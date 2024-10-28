import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FiltromedicoPipe } from '../../app/pipe/filtromedico.pipe';
import { Disponibilidad } from '../../app/clases/disponibilidad';
import { Datosusuario } from '../../app/entidades/datosusuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { PasstocsvService } from '../../app/servicios/passtocsv.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FiltromedicoPipe,MatIconModule],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})
export class MisTurnosComponent {

  public turnos:Disponibilidad[] = [];
  public decode:Datosusuario = {data: {id_usuario: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), user:'', password: '', tipo_usuario: 0, autorizado:true}};
  public filtroEspecialidad: string = '';


  constructor(private usuarioservices:UsuarioService, private route: Router,private passtocsvService: PasstocsvService){

    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);

    this.usuarioservices.LeerTurnosPaciente(this.decode).subscribe(
      x=> {
        if((<Disponibilidad[]>x)?.length >=1){
          console.log("Se han encontrado turnos", x);
          this.turnos = Object.assign([], x);
      } else {
        console.log("valor turnos", this.turnos)
        alert("No se encontraron turnos aceptados");
        this.route.navigateByUrl('/bienvenido');
      }});

  }

 
}
