import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private materiasUrl = 'http://localhost:3000/api/materias';
  private actividadesUrl = 'http://localhost:3000/api/actividades';
  private videosUrl = 'http://localhost:3000/api/videos';
  private librosUrl='http://localhost:3000/api/libros';
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

  postActividades(data: any): Observable<any> {
    return this.http.post<any>(this.actividadesUrl, data);
  }

  postVideos(data: any): Observable<any> {
    return this.http.post<any>(this.videosUrl, data);
  }

  postLibros(data: any): Observable<any> {
    return this.http.post<any>(this.librosUrl, data);
  }


  /*postVideo(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<any>(this.videosUrl, formData, { headers: headers });
  }*/


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
