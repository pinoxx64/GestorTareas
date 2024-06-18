import { Routes } from '@angular/router';

import { TareaComponent } from './components/tareasAdmin/tarea/tarea.component';
import { TareaProgramadorComponent } from './components/tareasProgramador/tarea-programador/tarea-programador.component';
import { VerUsuarioComponent } from './components/usuariosAdmin/ver-usuario/ver-usuario.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/presentacion', pathMatch: 'full'},
    {path: 'presentacion', component:HomeComponent},
    {path: 'tarea', component:TareaComponent},
    {path: 'tareaProgramador', component:TareaProgramadorComponent},
    {path: 'verUsuario', component:VerUsuarioComponent}
];
