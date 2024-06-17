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
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private servicioAuth: AuthService
  ){}
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() logged = new EventEmitter<boolean>();
  @Input() visible: boolean = false;
  correo = ''
  contrasena = ''
  error:string | null=null
  
  cerrar(): void {
    this.cerrarModal.emit();
  }
    showDialog() {
      this.visible = true;
    }
  login(){
  this.servicioAuth.login(this.correo,this.contrasena).subscribe({
    next:(data:any)=>{
      this.logged.emit(true)
      sessionStorage.setItem('token',data.token)
      this.servicioAuth.loginOn()
      this.visible=false
      window.location.href="../"
    },
    error:(err)=>{
      this.logged.emit(false)
      this.error=err.error.msg
  
    }
  })
  }
}
