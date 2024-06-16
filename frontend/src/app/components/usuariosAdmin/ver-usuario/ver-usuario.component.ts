import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
//import { EditableColumn, TableModule } from 'primeng/table';
//import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

import { Usuario } from '../../../interface/usuario';
import { UsuarioService } from '../../service/usuario.service';
/*import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';*/


@Component({
  selector: 'app-ver-usuario',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    /*TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,*/
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CommonModule
  ],
  templateUrl: './ver-usuario.component.html',
  styleUrl: './ver-usuario.component.css',
  providers:[
    //DialogService,
    UsuarioService,
    BrowserModule,
    //MessageService
  ]
})
export class VerUsuarioComponent {
  constructor(
    private servicioUsuario: UsuarioService
  ){}
  subscriptionUsers: Subscription=new Subscription;
  listaUsers:Array<Usuario>=[]
  @Input() admin=true

  ngOnInit(): void{
    this.subscriptionUsers = this.servicioUsuario.usuariosGet().subscribe({
      next: (data: Array<Usuario>) => {
        this.listaUsers=data
      },
      error: (e) => {

      }
    })
  }
}
