import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ConfirmComponent } from '../confirm/confirm.component';

import { Usuario } from '../../interface/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
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
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers:[
    UsuarioService,
    MessageService
  ]
})
export class RegistroComponent implements OnInit{
  constructor(
    public messageService: MessageService,
    private servicioUsuario: UsuarioService
  ){}
  usuarios: Usuario = { 
    id: 0, 
    nombre: '', 
    correo: '', 
    contrasena: ''
  }

  @Input() usuario?: any
  @Input() tipo=0
  @Input() visible: boolean = false;

  @Output() cerrarModal = new EventEmitter<void>();

  formGroup: FormGroup | undefined;

  //--------------------------------------------------------------------------------------

  showDialog() {
    this.visible = true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }

  ngOnInit() {
      this.formGroup = new FormGroup({
          date: new FormControl<Date | null>(null)
      });
  }

  crear(b:Boolean){
    if (b){
        this.messageService.add({ severity: 'info', summary:'Crear usuario', detail:'En curso', life:3000});
  
        this.servicioUsuario.usuariosPost(this.usuarios).subscribe({
          next: (data: any) => {
       
            setTimeout(() => {
              this.messageService.add({severity: 'success', summary:'Crear usuario', detail:'Completado', life:3000});
              this.usuarios.id = data.id
              this.usuarios.nombre= ''
              this.usuarios.correo= ''
              this.usuarios.contrasena= ''
              window.location.reload() 
            });
          },
          error: (error) => {
            this.messageService.add({severity: 'error', summary:'Crear usuario', detail:'Ha surguido un error al crear el usuario, inténtelo de nuevo', life:3000});
          }
        });
    }
  }
}
