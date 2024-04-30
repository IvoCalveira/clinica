import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../componentes/bienvenido/bienvenido.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistrarComponent } from '../componentes/registrar/registrar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BienvenidoComponent, LoginComponent, RegistrarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'turnosmedicos';
}
