import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { Subscription } from 'rxjs';

import { Tarea } from '../../../interface/tarea';
import { tareaService } from '../../../service/tarea.service';

@Component({
  selector: 'app-editar-tarea',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmComponent
  ],
  templateUrl: './editar-tarea.component.html',
  styleUrl: './editar-tarea.component.css',
  providers: [DialogService, MessageService, tareaService]
})
export class EditarTareaComponent {
  constructor(
    public messageService: MessageService,
    private servicioTarea: tareaService
  ) { }

  @Input() tarId!: string;

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
  @Input() id!: number;
  subscripcionTareas: Subscription = new Subscription;
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() tipo = 0;
  ta!: Tarea;

  tarForm!: FormGroup;

  ngOnInit() {
    this.tarForm = new FormGroup({
      descripcion: new FormControl(this.tareas.descripcion),
      dificultad: new FormControl(this.tareas.dificultad),
      horas_estimadas: new FormControl(this.tareas.horas_estimadas),
      horas_actules: new FormControl(this.tareas.horas_actuales),
      porcentaje: new FormControl(this.tareas.porcentaje),
      completo: new FormControl(this.tareas.completo),
      id_usuario: new FormControl(this.tareas.id_usuario)
    });
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }

  async guardar(b: Boolean) {
    if (b) {
      this.servicioTarea.tareasPut(this.tareas, this.id).subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Actualizar tarea', detail: 'Completada', life: 3000 });
            for (let i = 0; i < this.tarea.length; i++) {
              if (this.tarea[i].id == this.tareas.id) {
                this.tarea[i] = this.tareas;
                this.visible = false;
              }
            }
            this.visible = false;
            window.location.reload();
          }, 1000);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Actualizar tarea', detail: 'Error al actualizar el tarea, inténtelo de nuevo', life: 3000 });
        }
      });
    }
  }

  showDialog() {
    this.servicioTarea.tareaGet(this.id!).subscribe({
      next: (tar: Tarea) => {
        this.ta = tar;
        this.visible = true;
        this.tareas = { ...tar };
        this.tarForm.patchValue({
          descripcion: this.tareas.descripcion,
          dificultad: this.tareas.dificultad,
          horas_estimadas: this.tareas.horas_estimadas,
          horas_actuales: this.tareas.horas_actuales,
          porcentaje: this.tareas.porcentaje,
          completo: this.tareas.completo,
          id_usuario: this.tareas.id_usuario
        });
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Cargar tarea', detail: 'Error al cargar el tarea', life: 3000 });
      }
    });
  }

  async eliminar(b: Boolean) {
    this.servicioTarea.tareasDelete(this.id).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Eliminar tarea', detail: 'Completada', life: 3000 });
          for (let i = 0; i < this.tarea.length; i++) {
            if (this.tarea[i].id == this.tareas.id) {
              this.tarea[i] = this.ta;
              this.visible = false;
              window.location.reload();
            }
          }
          this.visible = false;
          window.location.reload();
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Eliminar tarea', detail: 'Error al eliminar el tarea, inténtelo de nuevo', life: 3000 });
      }
    });
  }
}
