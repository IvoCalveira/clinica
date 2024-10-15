import { Routes } from '@angular/router';
import { BienvenidoComponent } from '../componentes/bienvenido/bienvenido.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistrarComponent } from '../componentes/registrar/registrar.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { AdministrarMedicosComponent } from '../componentes/administrar-medicos/administrar-medicos.component';
import { LogueadoNivel2Guard, LogueadoNivel3Guard,TurnosGuard,usuarioDeslogueadoGuard, usuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { TurnosComponent } from '../componentes/turnos/turnos.component';

export const routes: Routes = [
    {path:'bienvenido', loadComponent:() => import('../componentes/bienvenido/bienvenido.component').then(l => l.BienvenidoComponent),children:[
        {path:'login', component:LoginComponent, canActivate:[usuarioDeslogueadoGuard]},
        {path:'registrar', component:RegistrarComponent,canActivate:[usuarioDeslogueadoGuard]},

    //{path:'bienvenido', component:BienvenidoComponent, children:[
        {path:'administrar-medicos',  loadComponent:() => import('../componentes/administrar-medicos/administrar-medicos.component').then(l => l.AdministrarMedicosComponent), canActivate:[LogueadoNivel3Guard]},
        {path:'turnos', loadComponent:() => import('../componentes/turnos/turnos.component').then(l => l.TurnosComponent), canActivate:[TurnosGuard]},
        {path:'misturnos', loadComponent:() => import('../componentes/mis-turnos/mis-turnos.component').then(l => l.MisTurnosComponent), canActivate:[TurnosGuard]},
        {path:'aceptarturno', loadComponent:() => import('../componentes/aceptar-turno/aceptar-turno.component').then(l => l.AceptarTurnoComponent), canActivate:[LogueadoNivel2Guard]},
        {path:'registrar', component: RegistrarComponent},
        {path:'login', component: LoginComponent},
        
    ]},
    {path:'', redirectTo:'bienvenido', pathMatch:'full'},
    {path:'**', component:ErrorComponent, },
];
