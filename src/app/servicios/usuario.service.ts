import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Disponibilidad } from '../clases/disponibilidad';
import { jwtDecode } from 'jwt-decode';
import { Datosusuario } from '../entidades/datosusuario';

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

  public decode: any;
  

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
    if (localStorage.getItem('UsuarioToken') ?? '' != ''){
      this.decode = jwtDecode<any>(localStorage.getItem('UsuarioToken') ?? '');

    this.usuarioLogueado = this.decode.data;
    }
  }


  public GetDisponibilidadMedicos(usuario: Usuario[]) {
    return this.http.post(this.APIURL + "/turnos", usuario);
  }

  public NuevoTurno(usuario: Disponibilidad) {
    return this.http.post(this.APIURL + "/tomar_turno", usuario);
  }

  public LeerTurnosTomados(usuario: Disponibilidad[]) {
    return this.http.post(this.APIURL + "/leer_tomados", usuario);
  }

  public LeerTurnosMedico(usuario: Datosusuario) {
    return this.http.post(this.APIURL + "/leer_tomados", usuario);
  }

  public LeerTurnosFinalizados(usuario: Datosusuario) {
    console.log("Datos enviados a la API:", usuario); // Verificar qué se está enviando
    return this.http.post<Disponibilidad[]>(this.APIURL + "/leer_finalizado", usuario.data);
  }

  public FinalizarTurnoApi(turno: Disponibilidad) {
    console.log("Datos enviados a la API:", turno);
    return this.http.post(this.APIURL + "/finalizar_turno", turno);
  }

  public modificarHorario(usuario: Usuario) {
    return this.http.post(this.APIURL + "/modificar_horario", usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public LeerTurnosPaciente(usuario: Datosusuario) {
    return this.http.post(this.APIURL + "/leer_tomadosPaciente", usuario.data);
  }

  public turnoAceptado(turno:Disponibilidad){
    return this.http.post(this.APIURL + "/aceptar_turno", turno);
  }

  public turnoRechazado(turno:Disponibilidad){
    return this.http.post(this.APIURL + "/rechazar_turno", turno);
  }
}

