import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { CargandoComponent } from '../cargando/cargando.component';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [RouterModule, MenuComponent, CargandoComponent],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {

}
