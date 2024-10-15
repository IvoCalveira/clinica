import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { inject } from '@angular/core';

export const usuarioLogueadoGuard: CanActivateFn = (route, state) => {
  var serv = inject(UsuarioService);

 

  return serv.estoyLogueado();
};

export const usuarioDeslogueadoGuard: CanActivateFn = (route, state) => {

var serv = inject(UsuarioService);

return serv.usuarioLogueado.user == '';
};

export const TurnosGuard: CanActivateFn = (route, state) => {


  var usServ =inject(UsuarioService);
  
  if(usServ.usuarioLogueado.tipo_usuario == 1 || usServ.usuarioLogueado.tipo_usuario == 3){
    
    return true;
  }
  
  else{
   return false;
  }
  
  };


export const LogueadoNivel2Guard: CanActivateFn = (route, state) => {


var usServ =inject(UsuarioService);

if(usServ.usuarioLogueado.tipo_usuario == 2 || usServ.usuarioLogueado.tipo_usuario == 3)
return true;

else{
 return false;
}

};

export const LogueadoNivel3Guard: CanActivateFn = (route, state) => {

var usServ =inject(UsuarioService);
return usServ.usuarioLogueado.tipo_usuario == 3;
};