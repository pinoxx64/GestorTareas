import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Tarea } from '../interface/tarea';

@Injectable({
    providedIn: 'root'
  })
export class tareaService{
    baseUrl = environment.baseUrl+environment.urlTarea
    constructor(private http:HttpClient){}

    tareasGet(): Observable<any  | undefined> {
        return this.http.get<any>(this.baseUrl).pipe(
          catchError((error) =>{
            return of(undefined)
          })
        )
      }
      tareaGet(id:number): Observable<any | undefined> {
    
        return this.http.get<any>(this.baseUrl+'/'+id).pipe(
          catchError((error) =>{
            return of(undefined)
          })
        )
      }
      tareasPost(tareas:Tarea): Observable<any | undefined> {
        let body={tareas:tareas}
        
         return this.http.post<any>(this.baseUrl,tareas).pipe(
         
         )
       }
      tareasDelete(id:number): Observable<any | undefined> {
    
        return this.http.delete<any>(this.baseUrl+'/'+id).pipe(
          catchError((error) =>{
            return of(undefined)
          })
        )
      }
      tareasPut(tareas:Tarea, id:number): Observable<any | undefined> {
        let body={tarea: tareas}
        return this.http.put<any>(this.baseUrl+'/'+id,tareas,{params: {auth: true}}).pipe(
    
        )
       }
}