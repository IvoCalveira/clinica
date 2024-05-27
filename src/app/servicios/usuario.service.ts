import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private APIURL:string =  "https://ivo_calveira-apiclinica.mdbgo.io";

  constructor(public http:HttpClient ) {
    //this.listaUsuario = JSON.parse(localStorage.getItem('usuario') || '[]');
     this.setLogueado();
  }
  public usuarioLogueado: Usuario = { nombre: '', password: '', mail: '', user:'', apellido: '', nacimiento: new Date(), tipo_usuario:0 };

  public listaUsuario: Usuario[] = [];

  public loginEnApi(usuario:Usuario){
    return this.http.post(this.APIURL  + "/login",usuario);
  }

  public setLogueadoXApi(usuario:Usuario){
    this.usuarioLogueado = usuario;
  }

  public registrar(usuario:Usuario){
    return this.http.post(this.APIURL  + "/insertar",usuario);
  }

  

  public estoyLogueado() :boolean{
    return this.usuarioLogueado.nombre != '';
  }

  public setLogueado(){
    if (localStorage.getItem('usuarioLocal') ?? '' != '')
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLocal') ?? '');
  }
}
