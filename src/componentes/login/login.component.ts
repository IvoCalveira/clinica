import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../app/entidades/usuario';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  listaUsuarios:Usuario[] = [];
  public usuario:Usuario = {nombre:'', password:'', apellido:'', user:'', mail:'', tipo_usuario:0, nacimiento: new Date()};

  public login(){
    this.listaUsuarios = JSON.parse(localStorage.getItem('usuarios')|| '[]');
    if(this.listaUsuarios.filter(t=> t.nombre.toLowerCase() == this.usuario.nombre.toLowerCase() &&
     t.password == this.usuario.password).length == 1)
     {
      alert("Bienvenido");
     }
  }
}
