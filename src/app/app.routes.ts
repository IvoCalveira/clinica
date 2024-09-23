import { Routes } from '@angular/router';
import { BienvenidoComponent } from '../componentes/bienvenido/bienvenido.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistrarComponent } from '../componentes/registrar/registrar.component';
import { CargandoComponent } from '../componentes/cargando/cargando.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { AdministrarMedicosComponent } from '../componentes/administrar-medicos/administrar-medicos.component';
import { LogueadoNivel2Guard, LogueadoNivel3Guard,usuarioDeslogueadoGuard, usuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { TurnosComponent } from '../componentes/turnos/turnos.component';

export const routes: Routes = [
    {path:'bienvenido', loadComponent:() => import('../componentes/bienvenido/bienvenido.component').then(l => l.BienvenidoComponent),children:[
        {path:'login', component:LoginComponent, canActivate:[usuarioDeslogueadoGuard]},
        {path:'registrar', component:RegistrarComponent,canActivate:[usuarioDeslogueadoGuard]},

    ]},

    {path:'bienvenido', loadComponent:() => import('../componentes/bienvenido/bienvenido.component').then(l => l.BienvenidoComponent), canActivate:[usuarioLogueadoGuard], children:[
    //{path:'bienvenido', component:BienvenidoComponent, children:[
        {path:'turnos', component:TurnosComponent},
        {path:'administrar-medicos',  loadComponent:() => import('../componentes/administrar-medicos/administrar-medicos.component').then(l => l.AdministrarMedicosComponent), canActivate:[LogueadoNivel3Guard]},
        {path:'registrar', component: RegistrarComponent},
        {path:'login', component: LoginComponent},
        
    ]},
    {path:'', redirectTo:'bienvenido', pathMatch:'full'},
    {path:'**', component:ErrorComponent, },
];
