import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private APIURL:string =  "https://ivo_calveira-apiclinica.mdbgo.io";

  constructor(public http:HttpClient ) {
    this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');
     this.setLogueado()
  }

  public mostrarAPi() {
    return this.http.get(this.APIURL  + "/pruebajson");
  }

  public loginEnApi(usuario:Usuario){
    return this.http.post(this.APIURL  + "/login",usuario);
  }

  public setLogueadoXApi(usuario:Usuario){
    this.usuarioLogueado = usuario;
  }

  public registrar(usuario:Usuario){
    return this.http.post(this.APIURL  + "/insertar",usuario);
  }

  public usuarioLogueado: Usuario = { nombre: '', password: '', mail: '', user:'', apellido: '', nacimiento: new Date(), tipo_usuario:0 };

  public listaUsuario: Usuario[] = [];

  public estoyLogueado() :boolean{
    return this.usuarioLogueado.nombre != '';
  }

  public setLogueado(){
    if (localStorage.getItem('usuarioLogueado') ?? '' != '')
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
  }
}
