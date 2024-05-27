import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LibrosResponse } from '../interfaces/libro.interface';
import { VideoModel } from '../models/video.model';
import { Observable, map } from 'rxjs';
import { ActividadModel } from '../models/actividad.model';
import { FormsModule } from '@angular/forms';
import { LibroModel } from '../models/lirbo.model';

@Component({
  selector: 'app-resource-full',
  standalone: true,
  imports: [RouterLink, HomePageComponent, CommonModule, FormsModule],
  templateUrl: './resource-full.component.html',
  styleUrl: './resource-full.component.css'
})

export class ResourceFullComponent implements OnInit  {

  @Input() materiaId: number | undefined;
  @Input() nivel: string | undefined;
  @Input() materia: string | undefined;

  videos: VideoModel[] = [];
  libros: LibroModel[] = [];
  actividades: ActividadModel[] = [];

  sanitizedUrls: { [id: string]: SafeResourceUrl } = {}

  videosMostrados: VideoModel[] = [];
  librosMostrados: LibroModel[] = [];
  actividadesMostradas: ActividadModel[] = [];

  videosPaginados: VideoModel[] = [];
  librosPaginados: LibroModel[] = [];
  actividadesPaginados: ActividadModel[] = [];

  filtroBusqueda: string = '';

  videosPorPagina: number = 5;
  librosPorPagina: number = 5;
  actividadesPorPagina: number = 5;

  paginaActualVideos: number = 1;
  paginaActualLibros: number = 1;
  paginaActualActividades: number = 1;

  mostrarVideo = true;
  mostrarLibro = true;
  mostrarActividad = true;

  filtroActivo: string | null = null

  mostrarTodo() {
    this.mostrarVideo = true;
    this.mostrarLibro = true;
    this.mostrarActividad = true;
    this.filtroActivo = null;
  }

  mostrarVideos() {
    this.mostrarVideo = true;
    this.mostrarLibro = false;
    this.mostrarActividad = false;
    this.filtroActivo = 'videos';
  }

  mostrarLibros() {
    this.mostrarVideo = false;
    this.mostrarLibro = true;
    this.mostrarActividad = false;
    this.filtroActivo = 'libros';
  }

  mostrarActividades() {
    this.mostrarVideo = false;
    this.mostrarLibro = false;
    this.mostrarActividad = true;
    this.filtroActivo = 'actividades';
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchVideos();
    this.fetchActivities();
    this.fetchLibros();
    //this.fetchObras();

    this.mostrarVideos();
  }

  get numeroTotalPaginasVideos(): number {
    return Math.ceil(this.videosMostrados.length / this.videosPorPagina);
  }

  get numeroTotalPaginasLibros(): number {
    return Math.ceil(this.librosMostrados.length / this.librosPorPagina);
  }

  get numeroTotalPaginasActividades(): number {
    return Math.ceil(this.actividadesMostradas.length / this.actividadesPorPagina);
  }

  private fetchVideos(): void {
    this.http.get<VideoModel[]>('https://apiresources-production-ba1f.up.railway.app/api/videos')
      .subscribe(
        response => {
          this.videos = response;
          this.sanitizeUrls();
          this.videosMostrados = this.videos;
          this.actualizarVideosPaginados();
        },
        error => {
          console.error('Error al recuperar los videos:', error.message);
        }
      );
  }

  private sanitizeUrls() {
    this.videos.forEach(video => {
      this.sanitizedUrls[video.video_id] = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    });
  }

  getSafeUrl(videoId: number): SafeResourceUrl | undefined {
    return this.sanitizedUrls[videoId];
  }

  private fetchActivities(): void {
    this.http.get<ActividadModel[]>('https://apiresources-production-ba1f.up.railway.app/api/actividades')
      .subscribe(
        response => {
          this.actividades = response;
          this.actividadesMostradas = this.actividades;
          this.actualizarActividadesPaginadas();
        },
        error => {
          console.error('Error al recuperar las actividades:', error);
        }
      );
  }


  private fetchLibros(): void {
    this.http.get<LibroModel[]>('https://apiresources-production-ba1f.up.railway.app/api/libros')
      .subscribe(
        response => {
          this.libros = response;
          this.librosMostrados = this.libros;
          this.actualizarLibrosPaginados();
        },
        error => {
          console.error('Error al recuperar los libros:', error.message);
        }
      );
  }


  /*private fetchObras(): void {
    this.http.get<LibrosResponse>('https://openlibrary.org/people/mekBot/books/want-to-read.json')
      .subscribe(
        response => {
          this.libros = response.reading_log_entries.map(entry => ({
            titulo: entry.work.title,
            autores: entry.work.author_names.join(', '),
            fecha_publicacion: entry.work.first_publish_year,
            fecha_registro: entry.logged_date,
            url_cubierta: entry.work.cover_id ? `https://covers.openlibrary.org/b/id/${entry.work.cover_id}-L.jpg` : null
          }));
          this.librosMostrados = this.libros;
          this.actualizarLibrosPaginados();
        },
        error => {
          console.error('Error al recuperar los libros:', error);
        }
      );
  }*/

  filtrarRecursos(): void {
    const filtro = this.filtroBusqueda.trim().toLowerCase();

    if (filtro === '') {
      this.restablecerRecursos();
    } else {
      this.videosMostrados = this.filtrarPorTituloYDescripcion(this.videos, filtro);
      this.actividadesMostradas = this.filtrarPorTituloYDescripcion(this.actividades, filtro);
      this.librosMostrados = this.filtrarPorTituloYDescripcion(this.libros, filtro);
    }

    this.paginaActualVideos = 1;
    this.paginaActualLibros = 1;
    this.paginaActualActividades = 1;

    this.actualizarVideosPaginados();
    this.actualizarLibrosPaginados();
    this.actualizarActividadesPaginadas();
  }

  private filtrarPorTituloYDescripcion(recursos: any[], filtro: string): any[] {
    return recursos.filter(recurso => {
      const titulo = recurso.titulo ? recurso.titulo.toLowerCase() : '';
      const descripcion = recurso.descripcion ? recurso.descripcion.toLowerCase() : '';
      return titulo.includes(filtro) || descripcion.includes(filtro);
    });
  }

  private actualizarVideosPaginados() {
    const startIndex = (this.paginaActualVideos - 1) * this.videosPorPagina;
    this.videosPaginados = this.videosMostrados.slice(startIndex, startIndex + this.videosPorPagina);
  }

  private actualizarLibrosPaginados() {
    const startIndex = (this.paginaActualLibros - 1) * this.librosPorPagina;
    this.librosPaginados = this.librosMostrados.slice(startIndex, startIndex + this.librosPorPagina);
  }

  private actualizarActividadesPaginadas() {
    const startIndex = (this.paginaActualActividades - 1) * this.actividadesPorPagina;
    this.actividadesPaginados = this.actividadesMostradas.slice(startIndex, startIndex + this.actividadesPorPagina);
  }

  paginaAnteriorVideos() {
    if (this.paginaActualVideos > 1) {
      this.paginaActualVideos--;
      this.actualizarVideosPaginados();
    }
  }

  paginaSiguienteVideos() {
    if (this.paginaActualVideos * this.videosPorPagina < this.videosMostrados.length) {
      this.paginaActualVideos++;
      this.actualizarVideosPaginados();
    }
  }

  paginaAnteriorLibros() {
    if (this.paginaActualLibros > 1) {
      this.paginaActualLibros--;
      this.actualizarLibrosPaginados();
    }
  }

  paginaSiguienteLibros() {
    if (this.paginaActualLibros * this.librosPorPagina < this.librosMostrados.length) {
      this.paginaActualLibros++;
      this.actualizarLibrosPaginados();
    }
  }

  paginaAnteriorActividades() {
    if (this.paginaActualActividades > 1) {
      this.paginaActualActividades--;
      this.actualizarActividadesPaginadas();
    }
  }

  paginaSiguienteActividades() {
    if (this.paginaActualActividades * this.actividadesPorPagina < this.actividadesMostradas.length) {
      this.paginaActualActividades++;
      this.actualizarActividadesPaginadas();
    }
  }

  restablecerRecursos(): void {
    this.videosMostrados = this.videos.slice();
    this.actividadesMostradas = this.actividades.slice();
    this.librosMostrados = this.libros.slice();
    this.actualizarVideosPaginados();
    this.actualizarLibrosPaginados();
    this.actualizarActividadesPaginadas();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
