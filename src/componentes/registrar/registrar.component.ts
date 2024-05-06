import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../app/entidades/usuario';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  public usuario:Usuario = {nombre:'', password:''};
  public password2:string='';

    public registrar(){

    }
}
