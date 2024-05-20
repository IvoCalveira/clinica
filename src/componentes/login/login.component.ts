import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../app/entidades/usuario';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UsuarioService } from '../../app/servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, MenuComponent,CommonModule,MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  listaUsuarios:Usuario[] = [];
  public usuario:Usuario = {nombre:'', password:'', apellido:'', user:'', mail:'', tipo_usuario:0, nacimiento: new Date()};

  constructor(private route:Router, private usuarioservices:UsuarioService){

    if(this.usuarioservices.estoyLogueado()){
       route.navigateByUrl('/bienvenido');
    }
  }

  public login(){
    // this.listaUsuarios = JSON.parse(localStorage.getItem('usuarios')|| '[]');
    // if(this.listaUsuarios.filter(t=> t.nombre.toLowerCase() == this.usuario.nombre.toLowerCase() &&
    // t.password == this.usuario.password).length == 1)
      this.usuarioservices.loginEnApi(this.usuario).subscribe(
        x=> {
          
          
          
            this.usuarioservices.setLogueadoXApi(<Usuario>x);

            localStorage.setItem('usuarioLogueado',JSON.stringify(this.usuario));
           
          }
          
          
        )
        this.usuarioservices.estoyLogueado();
        this.route.navigateByUrl('/bienvenido');
      
    }
  }

