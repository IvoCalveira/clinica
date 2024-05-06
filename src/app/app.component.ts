import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../componentes/bienvenido/bienvenido.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistrarComponent } from '../componentes/registrar/registrar.component';
import { Usuario } from './entidades/usuario';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../componentes/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BienvenidoComponent, LoginComponent, RegistrarComponent, FormsModule,MenuComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'turnosmedicos';
}
