import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ConfirmComponent } from '../../confirm/confirm.component';

import { Tarea } from '../../../interface/tarea';
import { tareaService } from '../../../service/tarea.service';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [
    ToastModule,
    ButtonModule,
    DialogModule,
    SliderModule,
    ReactiveFormsModule, 
    CalendarModule,
    FormsModule,
    ConfirmComponent
  ],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.css',
  providers: [
    tareaService,
    MessageService
  ]
})
export class CrearTareaComponent {
  constructor(
    public messageService: MessageService,
    private servicioTarea: tareaService
  ){}

  tareas: Tarea ={
    id: 0,
    descripcion: '',
    dificultad: '',
    horas_estimadas: 0,
    horas_actuales: 0,
    porcentaje: 0,
    completo: 0,
    id_usuario: 0
  }

  @Input() tarea?: any;
  @Input() tipo = 0;
  @Input() visible: boolean = false;

  @Output() cerrarModal = new EventEmitter<void>();

  formGroup: FormGroup | undefined;
  tarForm!: FormGroup;

  showDialog() {
    this.visible = true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }

  ngOnInit() {
    this.tarForm = new FormGroup({
      descripcion: new FormControl(this.tareas.descripcion),
      dificultad: new FormControl(this.tareas.dificultad),
      horas_estimadas: new FormControl(this.tareas.horas_estimadas)
    });
  }

  crear(b: Boolean) {
    if (b) {
      this.messageService.add({ severity: 'info', summary: 'Crear tarea', detail: 'En curso', life: 3000 });

      this.servicioTarea.tareasPost(this.tareas).subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Crear tarea', detail: 'Completado', life: 3000 });
            this.tareas.id = data.id;
            this.tareas.descripcion = '';
            this.tareas.dificultad = '';
            this.tareas.horas_estimadas = 0;
            this.tareas.horas_actuales = 0;
            this.tareas.completo = 0;
            this.tareas.porcentaje = 0;
            this.tareas.id_usuario = 0;
            window.location.reload();
          });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Crear tarea', detail: 'Ha surgido un error al crear el tarea, inténtelo de nuevo', life: 3000 });
        }
      });
    }
  }
}
