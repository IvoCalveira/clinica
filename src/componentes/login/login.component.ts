import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../app/entidades/usuario';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // listaUsuarios:Usuario[] = [];
  public usuario: Usuario = { id_usuario:0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), user: '', password: '', tipo_usuario: 0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0  };
  public data: Usuario = { id_usuario:0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), user: '', password: '', tipo_usuario: 0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0  };
  public usuarioLocal: Usuario[] = [];
  public loading: boolean = false;


  constructor(private route: Router, private usuarioservices: UsuarioService) {

    if (this.usuarioservices.estoyLogueado()) {
      route.navigateByUrl('/bienvenido');
    }
  }

  public login() {
    // //cargamos la lista desde el local storage
    // this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // //verificamos credenciales
    // if(this.listaUsuario.filter(t=> t.nombre.toLowerCase == this.usuario.nombre.toLowerCase && t.password == this.usuario.password ).length == 1){

    //   //guardamos usuario logueado



    this.usuarioservices.loginEnApi(this.usuario).subscribe(
      x => {

        if (x == null) {
          alert("Usuario o Contraseña incorrecto, intente de nuevo");
        }
        else{
          var decode = jwtDecode<any>(x.toString());
          if (decode.data.user !=null) { 
        



          if(decode.data.autorizado == false){ //Si el usuario no esta habilitado, no se loguea
            alert("Su usuario aun no esta habilitado. Por favor contactarse con un administrador");
          } else {
            localStorage.setItem("UsuarioToken",x.toString());;
            
            //this.usuarioservices.setLogueadoXApi(<Usuario>x);
            this.usuarioservices.setLogueado();
            // localStorage.setItem('usuarioLocal', JSON.stringify(<Usuario>x));
            this.route.navigateByUrl('/bienvenido');
          }

          //Guardamos en el local storage el usuario logueado
        }

            }  
            }  
            )
    this.usuarioservices.estoyLogueado();
  }


}
