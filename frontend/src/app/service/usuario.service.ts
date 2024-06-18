/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../interface/usuario';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService{
    baseUrl = environment.baseUrl+environment.urlUsuario
    constructor(private http:HttpClient){}

    usuariosGet(): Observable<any  | undefined> {
        return this.http.get<any>(this.baseUrl).pipe(
          catchError((error) =>{
            return of(undefined)
          })
        )
      }
      usuarioGet(id:number): Observable<any | undefined> {
    
        return this.http.get<any>(this.baseUrl+'/'+id).pipe(
          catchError((error) =>{
            return of(undefined)
          })
        )
      }
      usuariosPost(usuarios:Usuario): Observable<any | undefined> {
        let body={usuarios:usuarios}
        
         return this.http.post<any>(this.baseUrl,usuarios).pipe(
         
         )
       }
      usuariosDelete(id:number): Observable<any | undefined> {
    
        return this.http.delete<any>(this.baseUrl+'/'+id).pipe(
          catchError((error) =>{
            return of(undefined)
          })
        )
      }
      usuariosPut(usuarios:Usuario, id:number): Observable<any | undefined> {
        let body={usuario: usuarios}
        return this.http.put<any>(this.baseUrl+'/'+id,usuarios,{params: {auth: true}}).pipe(
    
        )
       }
}*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = environment.baseUrl + environment.urlUsuario;
  
  constructor(private http: HttpClient) {}

  // Método para obtener el token CSRF
  getCsrfToken(): Observable<any> {
    return this.http.get('/sanctum/csrf-cookie');
  }

  // Método para obtener el token CSRF de las cookies
  getCsrfTokenFromCookies(): string {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  usuariosGet(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) => {
        return of(undefined);
      })
    );
  }

  usuarioGet(id: number): Observable<any | undefined> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        return of(undefined);
      })
    );
  }

  usuariosPost(usuario: Usuario): Observable<any | undefined> {
    return new Observable<any | undefined>(observer => {
      this.getCsrfToken().subscribe(() => {
        const headers = new HttpHeaders({ 'X-CSRF-TOKEN': this.getCsrfTokenFromCookies() });
        this.http.post<any>(this.baseUrl, usuario, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error),
          () => observer.complete()
        );
      });
    });
  }

  usuariosDelete(id: number): Observable<any | undefined> {
    return new Observable<any | undefined>(observer => {
      this.getCsrfToken().subscribe(() => {
        const headers = new HttpHeaders({ 'X-CSRF-TOKEN': this.getCsrfTokenFromCookies() });
        this.http.delete<any>(`${this.baseUrl}/${id}`, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error),
          () => observer.complete()
        );
      });
    });
  }

  usuariosPut(usuario: Usuario, id: number): Observable<any | undefined> {
    return new Observable<any | undefined>(observer => {
      this.getCsrfToken().subscribe(() => {
        const headers = new HttpHeaders({ 'X-CSRF-TOKEN': this.getCsrfTokenFromCookies() });
        this.http.put<any>(`${this.baseUrl}/${id}`, usuario, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error),
          () => observer.complete()
        );
      });
    });
  }
}
