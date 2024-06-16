//Arreglar al crearlo añadir la idUsuario, mi idea es crear otro model para las preferencias
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
import { Preferencia } from '../../interface/preferencia';
import { PreferenciaService } from '../../service/preferencia.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-crear-usuario',
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
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css',
  providers:[
    UsuarioService,
    MessageService
  ]
})
export class CrearUsuarioComponent {
  constructor(
    public messageService: MessageService,
    private servicioUsuario: UsuarioService,
    private servicioPreferencia: PreferenciaService
  ){}
  usuarios: Usuario = { 
    id: 0, 
    nombre: '', 
    correo: '', 
    fechaNacimiento: new Date(2001, 0, 1),
    contrasena: '',
    genero: '',
    foto: ''
  }


  @Input() usuario?: any
  @Input() tipo=0
  @Input() visible: boolean = false;
  //maxDate = new Date().toLocaleDateString();

  @Output() cerrarModal = new EventEmitter<void>();

  numArte: number = 50;
  numDeporte: number = 50;
  numPolitico: number = 50;

  //idUsu!: number

  formGroup: FormGroup | undefined;
  
  formularioFoto: FormData | null = null
  fotoPreview: string | null = null

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

  uplodadFoto(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.formularioFoto = new FormData()
      this.formularioFoto.append('archivo', file)
      this.fotoPreview = URL.createObjectURL(file);
      
    } else {
      this.formularioFoto = null
    }
  }
  limpiarFoto(archivo: any) {
    archivo.value = null
    this.formularioFoto = null
    this.fotoPreview = null
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
              this.usuarios.fechaNacimiento= new Date(2001, 0, 1)
              this.usuarios.contrasena= ''
              this.usuarios.genero= ''
              this.usuarios.foto= '' 
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