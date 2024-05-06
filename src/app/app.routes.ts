import { Routes } from '@angular/router';
import { BienvenidoComponent } from '../componentes/bienvenido/bienvenido.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistrarComponent } from '../componentes/registrar/registrar.component';
import { CargandoComponent } from '../componentes/cargando/cargando.component';
import { ErrorComponent } from '../componentes/error/error.component';

export const routes: Routes = [
    {path:'bienvenido', component:BienvenidoComponent, children:[
        {path:'', component: LoginComponent},
        {path:'registrar', component: RegistrarComponent}
            ]
    },
    {path:'', redirectTo:'bienvenido', pathMatch:'full'},
    {path:'**', component:ErrorComponent, },
];
