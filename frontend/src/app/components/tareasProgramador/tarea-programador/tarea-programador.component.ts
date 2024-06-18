import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from  'rxjs';
import { EditableColumn, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { EditarTareaProgramadorComponent } from '../editar-tarea-programador/editar-tarea-programador.component'; 
import { Tarea } from '../../../interface/tarea';
import { tareaService } from '../../../service/tarea.service';

@Component({
  selector: 'app-tarea-programador',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    TableModule,
    ButtonModule,
    EditarTareaProgramadorComponent
  ],
  templateUrl: './tarea-programador.component.html',
  styleUrl: './tarea-programador.component.css',
  providers: [
    tareaService
  ]
})
export class TareaProgramadorComponent {
  constructor(
    private servicioTarea: tareaService
  ){}
  subscriptionTareas: Subscription=new Subscription;
  listaTarea:Array<Tarea>=[] 
  @Input() admin=true

  ngOnInit(): void{
    this.subscriptionTareas = this.servicioTarea.tareasGet().subscribe({
      next: (data: Array<Tarea>) => {
        this.listaTarea=data
      },
    })
  }
}
