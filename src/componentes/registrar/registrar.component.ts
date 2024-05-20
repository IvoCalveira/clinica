import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { Usuario } from '../../app/entidades/usuario';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  listaUsuarios:Usuario[] = [];
  public usuario:Usuario = {nombre:'', password:'', apellido:'', user:'', mail:'', tipo_usuario:0, nacimiento: new Date()};
  public password2:string='';

  constructor(public router:Router) {
    this.listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }


  validarExiste(){
    return this.listaUsuarios.filter(
      t=> t.nombre.toLowerCase() == this.usuario.nombre.toLowerCase()).length == 1;
  }

    public registrar(){
      this.listaUsuarios.push(this.usuario);
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      this.listaUsuarios = JSON.parse(JSON.stringify(this.listaUsuarios));
      this.router.navigateByUrl('/bienvenido');
    }
}
