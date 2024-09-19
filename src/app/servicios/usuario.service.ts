import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { HttpClient } from '@angular/common/http';
import { Disponibilidad } from '../clases/disponibilidad';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private APIURL:string =  "https://ivo_calveira2-clinicaapi.mdbgo.io";

  constructor(public http:HttpClient ) {
    //this.listaUsuario = JSON.parse(localStorage.getItem('usuario') || '[]');
     this.setLogueado();
  }
  public usuarioLogueado: Usuario = { id_usuario:0, nombre: '', password: '', mail: '', user:'', apellido: '', nacimiento: new Date(), tipo_usuario:0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0 };

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
    return this.usuarioLogueado.user != '';
  }

  public autorizarMedico(usuario: Usuario[]) {
    return this.http.post(this.APIURL + "/leer", usuario);
  }

  public autorizarUsuario(usuario: Usuario) {
    return this.http.post(this.APIURL + "/autorizar", usuario);
  }


  public setLogueado(){
    if (localStorage.getItem('usuarioLocal') ?? '' != '')
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLocal') ?? '');
  }


  public GetDisponibilidadMedicos(usuario: Usuario[]) {
    return this.http.post(this.APIURL + "/get_disponibilidad", usuario);
  }
  public NuevoTurno(usuario: Disponibilidad) {
    return this.http.post(this.APIURL + "/get_disponibilidad", usuario);
  }
  public LeerTurnosTomados(usuario: Disponibilidad[]) {
    return this.http.post(this.APIURL + "/get_disponibilidad", usuario);
  }
}

