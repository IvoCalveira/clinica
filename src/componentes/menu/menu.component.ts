import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../../app/entidades/usuario';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  public listaUsuario:Usuario [] = [];
  private route: Router = new Router;
  public estaLogueado: boolean = false;

  constructor(public usuarioservices:UsuarioService){

    

    if(this.usuarioservices.usuarioLogueado.user != '' ){
      this.estaLogueado=true;
      this.usuarioservices.estoyLogueado();

      
    }

    

    //Si hay, se guarda en listaUsuario el usuario que este logueado desde el LocalStorage
   // this.listaUsuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '[]');

    //Verifico si hay un usuario logueado
    //if(this.listaUsuario.length>0)
    //  this.estaLogueado=true;
  }
  public logout(){
    //Vaciar el local storage de la sesion iniciada
    localStorage.clear();


    this.listaUsuario = [];
    this.usuarioservices.usuarioLogueado = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), user:'', password: '', tipo_usuario: 0};
    this.estaLogueado=false;

    this.route.navigateByUrl('/bienvenido');

  }
}
