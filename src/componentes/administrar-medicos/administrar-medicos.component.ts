import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { Usuario } from '../../app/entidades/usuario';

@Component({
  selector: 'app-administrar-medicos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './administrar-medicos.component.html',
  styleUrl: './administrar-medicos.component.css'
})
export class AdministrarMedicosComponent {

  public listaMedicos: Usuario = { id_usuario: 0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), user: '', password: '', tipo_usuario: 0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true  };
  public medicos:Usuario [] = [];
  public medicosAutorizar:boolean=false;

  constructor(private usuarioservices:UsuarioService) {
        
    this.usuarioservices.autorizarMedico(this.medicos).subscribe(
        x=> {

            if((<Usuario[]>x).length >=1){
                this.medicos = Object.assign([], x);
            
        }
    });
  }
  public autorizar(index: number){
    let usuarioAutorizar = this.medicos[index];
    usuarioAutorizar.autorizado = true;
    this.usuarioservices.autorizarUsuario(usuarioAutorizar).subscribe(
        x=>{

            alert("Usuario autorizado correctamente");

        }
    );
        
}

public Desautorizar(index: number){
    let usuarioAutorizar = this.medicos[index];
    usuarioAutorizar.autorizado = false;
    this.usuarioservices.autorizarUsuario(usuarioAutorizar).subscribe(
        x=>{

            alert("Usuario desautorizado correctamente"); 
            
        }
    );
        
}
}
