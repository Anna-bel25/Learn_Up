import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private materiasUrl = 'https://apiresources-production-ba1f.up.railway.app/api/materias';
  private actividadesUrl = 'https://apiresources-production-ba1f.up.railway.app/api/actividades';
  private videosUrl = 'https://apiresources-production-ba1f.up.railway.app/api/videos';
  private librosUrl='https://apiresources-production-ba1f.up.railway.app/api/libros';
  private userUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMaterias(): Observable<any> {
    return this.http.get<any>(this.materiasUrl);
  }
  getActividades(): Observable<any> {
    return this.http.get<any>(this.actividadesUrl);
  }

  getVideos(): Observable<any> {
    return this.http.get<any>(this.videosUrl);
  }

  getLibros(): Observable<any>{
    return this.http.get<any>(this.librosUrl);
  }
  /*---------------MARIA------------------------*/
  postUsers(userData: any): Observable<any> {
    return this.http.post(`${this.userUrl}/users`, userData);
  }

  postUsersLogin(userData: any): Observable<any> {
    return this.http.post(`${this.userUrl}/login`, userData);
  }
  /*--------------------------------------------*/

  /*------------Ivette--------------*/
  crearColeccion(nombre: string, esPrivado: boolean): Observable<any> {
    const body = { nombre, es_privado: esPrivado };
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.userUrl}/colecciones`, body, { headers });
  }

  obtenerColecciones(): Observable<{ nombre: string, selected: boolean }[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<{ nombre: string, selected: boolean }[]>(`${this.userUrl}/colecciones`, { headers });
  }
}
